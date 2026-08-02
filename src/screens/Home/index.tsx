// @ts-ignore
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "../Login";
import { useAuthContext } from "@/context/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { FlatList } from "react-native-gesture-handler";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export const Home = () => {

    const navigate = useNavigation<StackNavigationProp<PublicStackParamsList>>();
    const {handleLogout} = useAuthContext();
    const {fetchCategories, fetchTransactions, transactions} = useTransactionContext();
    const {handleError} = useErrorHandler();

    const handleFetchCategories = async () => {
        try{
            await fetchCategories();
        } catch (error) {
            handleError(error, "Ops! Falha ao carregar as categorias.");
        }
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                handleFetchCategories(),
                fetchTransactions()
            ])
        })();
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-stone-800">
            <FlatList 
                className="bg-stone-700"
                ListHeaderComponent={ListHeader} 
                data={transactions}
                keyExtractor={({id}) => `transaction-${id}`} 
                renderItem={({item}) => <TransactionCard transaction={item} />} />
        </SafeAreaView>
    )
}