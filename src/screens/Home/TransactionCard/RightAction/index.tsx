import { colors } from "@/shared/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { FC, useState } from "react";
import { TouchableOpacity } from "react-native"
import { DeleteModal } from "./DeleteModal";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useTransactionContext } from "@/context/transaction.context";

interface IParams {
    transactionId: number
}

export const RightAction: FC<IParams> = ({transactionId}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const {notify} = useSnackbarContext();
    const { refreshTransaction } = useTransactionContext();

    const showModal = () => {
        setModalVisible(true);
    }

    const hideModal = () => {
        setModalVisible(false);
    }

    const {handleError} = useErrorHandler();

    const handleDeleteTransaction = async () => {
        try {
            setLoading(true);
            await transactionService.deleteTransaction(transactionId);
            notify({
                message: "Transação deletada com sucesso!",
                type: "SUCCESS"
            });
            await refreshTransaction();
            hideModal();
        } catch (error) {
            handleError(error, "Ops! Falha ao deletar a transação.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <TouchableOpacity 
                activeOpacity={0.8}
                className="h-[140] bg-red-700 w-[80] rounded-r-[6] items-center justify-center"
                onPress={showModal}>
                <MaterialIcons name="delete-outline" size={30} color={colors.white} />
                <DeleteModal 
                    handleDeleteTransaction={handleDeleteTransaction}
                    visible={modalVisible}
                    hideModal={hideModal} 
                    loading={false} />
            </TouchableOpacity>
        </>

    )
}