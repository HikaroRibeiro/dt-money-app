import { ITransaction } from "@/shared/interfaces/transaction"
import { FC } from "react"
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable"
import { Text, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { colors } from "@/shared/colors"
import { TransactionTypes } from "@/shared/enums/transaction-types"
import clsx from "clsx"
import { RightAction } from "./RightAction"

interface Params {
    transaction: ITransaction
}

export const TransactionCard: FC<Params> = ({ transaction }) => {

    const formatedTransactionValue = transaction.value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    const isExpense = transaction.type.id === TransactionTypes.EXPENSE;

    return (
        <Swipeable containerStyle={{
            alignItems: "center",
            alignSelf: "center",
            overflow: "hidden",
            width: "90%",
            marginBottom: 16
            }}
            renderRightActions={() => <RightAction />}
            overshootRight={false}>
                <View className="h-[140px] bg-stone-600 rounded-[6] p-6">
                    <Text className="text-white text-base">
                        {transaction.description}
                    </Text>
                    <Text className={clsx("text-2xl font-bold mt-2", isExpense ? "text-red-600" : "text-emerald-600")}>
                        {isExpense && "-"}
                        {formatedTransactionValue}
                    </Text>
                    <View className="flex-row justify-between items-center w-full">
                        <View className="items-center flex-row mt-3">
                            <MaterialIcons name="label-outline" size={23} color={colors.gray[700]} />
                            <Text className="text-gray-400 text-base ml-2">{transaction.category.name}</Text>
                        </View>
                        <View className="items-center flex-row mt-3">
                            <MaterialIcons name="calendar-month" size={20} color={colors.gray[700]} />
                            <Text className="text-gray-400 text-base ml-2">{format(transaction.createdAt, "dd/MM/yyyy", { locale: ptBR })}</Text>
                        </View>
                    </View>   
                </View>
        </Swipeable>
    )
}