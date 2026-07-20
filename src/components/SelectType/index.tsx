import { colors } from "@/shared/colors"
import { TransactionTypes } from "@/shared/enums/transaction-types"
import { MaterialIcons } from "@expo/vector-icons"
import clsx from "clsx"
import { FC } from "react"
import { TouchableOpacity, View, Text } from "react-native"

interface Props {
    setTransactionType: (type: TransactionTypes) => void
    typeId?: number
}
export const SelectTypeSelector: FC<Props> = ({ setTransactionType, typeId}) => {
    return (
        <View className="flex-row justify-between gap-2 mt-2">

            <TouchableOpacity
                onPress={() => setTransactionType(TransactionTypes.REVENUE)}
                className={clsx("flex-row flex-1 justify-center items-center p-2 h-[58] rounded-lg", typeId === TransactionTypes.REVENUE 
                    ? "bg-emerald-600" 
                    : "bg-stone-700")}>
                <MaterialIcons 
                    name="arrow-circle-up" 
                    color={typeId === TransactionTypes.REVENUE 
                        ? colors.white 
                        : colors["accent-brand-light"]} 
                    size={30}
                    className="mr-2"
                />
                <Text className="text-white">Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => setTransactionType(TransactionTypes.EXPENSE)}
                className={clsx("flex-row flex-1 justify-center items-center p-2 h-[58] rounded-lg", typeId === TransactionTypes.EXPENSE 
                    ? "bg-red-600" 
                    : "bg-stone-700")} >
                <MaterialIcons 
                    name="arrow-circle-down"
                    color={typeId === TransactionTypes.EXPENSE 
                        ? colors.white 
                        : colors["accent-red"]}
                    size={30}
                    className="mr-2" 
                />
                <Text className="text-white">Saida</Text>
            </TouchableOpacity>   

        </View>
    )
}