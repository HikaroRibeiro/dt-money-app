import { colors } from "@/shared/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { FC } from "react"
import { ITransaction } from "@/shared/interfaces/transaction"
import { Pressable } from "react-native-gesture-handler"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { View } from "react-native"
import { EditTransactionForm } from "./EditTransactionForm"

interface IParams {
    transaction: ITransaction
}

export const LeftAction: FC<IParams> = ({transaction}) => {
    const { openBottomSheet} = useBottomSheetContext();
    
    return (
        <Pressable onPress={() => openBottomSheet(<EditTransactionForm transaction={transaction} />,0)}>
            <View className="h-[140px] w-[80px] bg-blue-600 rounded-l-[6px] items-center justify-center">
                <MaterialIcons name="edit" size={30} color={colors.white} />
            </View>
        </Pressable>
    )
}