import { AuthHeader } from "@/components/AuthHeader"
import { ScrollView, View, Text } from "react-native"
import { TransactionCard } from "./TransactionCard"
import { TransactionTypes } from "@/shared/enums/transaction-types"
import { useTransactionContext } from "@/context/transaction.context"

export const ListHeader = () => {

    const {totalTransactions} = useTransactionContext()

    return (
        <>
            <AuthHeader />
            <View className="h-[150px] w-full">
                <View className="h-[50px] bg-stone-900" />
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    className="absolute pl-6 h-[141px]">

                    <TransactionCard type={TransactionTypes.REVENUE} amount={totalTransactions.revenue} />
                    <TransactionCard type={TransactionTypes.EXPENSE} amount={totalTransactions.expense} />
                    <TransactionCard type={"total"} amount={totalTransactions.total} />
                </ScrollView>
            </View>
        </>
    )
}