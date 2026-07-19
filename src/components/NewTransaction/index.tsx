import { ICreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request"
import { useState } from "react"
import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import CurrencyInput from "react-native-currency-input";

export const NewTransaction = () => {

    const {closeBottomSheet} = useBottomSheetContext()

    const [transaction, setTransaction] = useState<ICreateTransactionInterface>({
        typeId: 1,
        description: "",
        categoryId: 1,
        value: 0
    })

    const setTransactionData = (key: keyof ICreateTransactionInterface, value: string | number) => {
        setTransaction(prevData => ({ ...prevData, [key]: value }))   
    }

    return (
        <View className="px-8 py-5">
            <TouchableOpacity 
                onPress={() => closeBottomSheet()} 
                className="w-full flex-row justify-between">
                <Text className="text-xl font-bold text-white">Nova transação</Text>
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
            </View>
        </View>

    )
}