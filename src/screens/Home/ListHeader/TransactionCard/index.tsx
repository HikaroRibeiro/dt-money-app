import { useTransactionContext } from "@/context/transaction.context"
import { colors } from "@/shared/colors"
import { TransactionTypes } from "@/shared/enums/transaction-types"
import { MaterialIcons } from "@expo/vector-icons"
import { FC } from "react"
import { View, Text } from "react-native"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ICONS } from "./strategies/icon-strategy"
import { CARD_DATA } from "./strategies/card-data-strategy"
import { moneyMapper } from "@/shared/utils/money-mapper"
import clsx from "clsx"

// Utilizado o padrão de projeto Strategy neste componente.

export type TransactionCardType = TransactionTypes | "total"

interface IProps {
    type: TransactionCardType,
    amount: number
}

export const TransactionCard: FC<IProps> = ({ type, amount}) => {

    const iconData = ICONS[type];
    const cardData = CARD_DATA[type];

    const formattedAmount = moneyMapper(amount);

    const{transactions} = useTransactionContext()

    const lastTransaction = transactions.find((transaction) => transaction.type.id === type);

    return (
        <View className={clsx(`${cardData.bgColor} min-w-[280px] rounded-[6px] px-8 py-6 justify-between mr-6`, 
        type === "total" && "mr-14"
        )}>
            <View className="flex-row justify-between items-center">
                <Text className="text-white text-base">{cardData.label}</Text> 
                <MaterialIcons name={ICONS[type].name} size={26} color={iconData.color} />
            </View>
            <View>
                <Text className="text-2xl text-gray-300 font-bold">{formattedAmount}</Text>
                {type !== "total" && (
                    <Text className="text-gray-300">
                        {
                            lastTransaction?.createdAt ? 
                            format(lastTransaction?.createdAt, `'Última ${cardData.label.toLowerCase()} em' d 'de' MMMM 'de' yyyy`, { locale: ptBR }) : 
                            `Nenhuma ${cardData.label.toLowerCase()} cadastrada.`
                        }
                    </Text>    
                )}
            </View>
        </View>
    )
}