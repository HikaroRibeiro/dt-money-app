import { FC, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import CurrencyInput from "react-native-currency-input";
import * as yup from "yup";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SelectCategoryModal } from "@/components/SelectCategoryModal";
import { SelectTypeSelector } from "@/components/SelectType";
import { AppButton } from "@/components/AppButton";
import { transactionSchema } from "./schema";
import { ITransaction } from "@/shared/interfaces/transaction";
import { IUpdateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request";

type ValidationErrorsTypes = Record<keyof IUpdateTransactionInterface, string>

interface IParams {
    transaction: ITransaction
}

export const EditTransactionForm: FC<IParams> = ({transaction: transactionToUpdate,}) => {

    const {closeBottomSheet} = useBottomSheetContext()
    const {updateTransaction} = useTransactionContext()
    const {handleError} = useErrorHandler() 
    
    const [loading, setLoading] = useState(false);

    const [transaction, setTransaction] = useState<IUpdateTransactionInterface>({
        id: transactionToUpdate.id,
        typeId: transactionToUpdate.type.id,
        categoryId: transactionToUpdate.category.id,
        description: transactionToUpdate.description,
        value: transactionToUpdate.value});
    const [validationErrors, setValidationErrors] = useState<ValidationErrorsTypes>();

    const handleUpdateTransaction = async () => {
        try{
            setLoading(true);

            await transactionSchema.validate(transaction, {abortEarly: false});
            await updateTransaction(transaction);
            closeBottomSheet();
            
        } catch (error) {
            if(error instanceof yup.ValidationError) {
                const errors = {description:""} as ValidationErrorsTypes;
                error.inner.forEach(err => {
                    if(err.path){
                        errors[err.path as keyof IUpdateTransactionInterface] = err.message;
                    }
                });
                setValidationErrors(errors);
            } else {
                handleError(error, "Ops! Falha ao atualizar a transação.");
            }
        } finally {
            setLoading(false);
        }
    }

    const setTransactionData = (key: keyof IUpdateTransactionInterface, value: string | number) => {
        setTransaction(prevData => ({ ...prevData, [key]: value }))   
    }

    return (
        <View className="px-8 py-5">
            <TouchableOpacity 
                onPress={() => closeBottomSheet()} 
                className="w-full flex-row justify-between">
                <Text className="text-xl font-bold text-white">Editar</Text>
                <MaterialIcons 
                    name="close"
                    color={colors.gray[700]}
                    size={20} />
            </TouchableOpacity>

            <View className="flex-1 mt-8 mb-8">
                <TextInput
                    onChangeText={(textValue) => setTransactionData("description", textValue)} 
                    className="text-white text-lg h-[50px] bg-black my-2 rounded-[6] pl-4"
                    placeholder="Descrição"
                    value={transaction.description}
                    placeholderTextColor={colors.gray[700]} />

                {validationErrors?.description && 
                    <ErrorMessage>{validationErrors.description}</ErrorMessage>}

                <CurrencyInput
                    className="text-white text-lg h-[50px] bg-black my-2 rounded-[6] pl-4"
                    placeholder="Valor"
                    placeholderTextColor={colors.gray[700]}
                    value={transaction.value}
                    prefix="R$ "
                    delimiter=","
                    precision={2}
                    minValue={0}
                    onChangeValue={(value) => setTransactionData("value", value ?? 0)} 
                     />

                {validationErrors?.value && 
                    <ErrorMessage>{validationErrors.value}</ErrorMessage>}

                <SelectCategoryModal 
                    selectedCategory={transaction.categoryId} 
                    onSelect={(categoryId) => setTransactionData("categoryId", categoryId)} />

                {validationErrors?.categoryId && 
                    <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>}

                <SelectTypeSelector 
                    setTransactionType={(typeId) => setTransactionData("typeId", typeId)} 
                    typeId={transaction.typeId}
                 />

                {validationErrors?.typeId && 
                    <ErrorMessage>{validationErrors.typeId}</ErrorMessage>}
                    
                <View className="my-4">
                    <AppButton onPress={handleUpdateTransaction} iconName={"save"} mode={"fill"}>{loading ? <ActivityIndicator color={colors.white} /> : "Atualizar"}</AppButton>
                </View>   
            </View>
        </View>

    )
}