// @ts-ignore
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "../Login";
import { useAuthContext } from "@/context/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { EmptyList } from "./EmptyList";
import { ActivityIndicator } from "react-native";
import { colors } from "@/shared/colors";

export const Home = () => {

    const navigate = useNavigation<StackNavigationProp<PublicStackParamsList>>();
    const {handleLogout} = useAuthContext();
    const {fetchCategories, fetchTransactions, transactions, refreshTransaction, loadMoreTransactions, loadings, handleLoadings} = useTransactionContext();
    const {handleError} = useErrorHandler();

    const handleFetchCategories = async () => {
        try{
            handleLoadings({key: "initial", value: true});
            await fetchCategories();
        } catch (error) {
            handleError(error, "Ops! Falha ao carregar as categorias.");
        }finally {
            handleLoadings({key: "initial", value: false});
        }
  
    }

    const handleFetchInitialTransactions = async () => {
        try{
            handleLoadings({key: "initial", value: true});
            await fetchTransactions({page: 1});
        } catch (error) {
            handleError(error, "Ops! Falha ao carregar as transações.");
        } finally {
            handleLoadings({key: "initial", value: false});
        }
    }

    const handleLoadMoreTransactions = async () => {
        try{
            handleLoadings({key: "loadMore", value: true});

            await loadMoreTransactions();
            
        } catch (error) {
            handleError(error, "Ops! Falha ao carregar novas transações.");
        } finally {
            handleLoadings({key: "loadMore", value: false});
        }
    }

    const handleRefreshTransactions = async () => {
        try{
            handleLoadings({key: "refresh", value: true});
            await refreshTransaction();
        } catch (error) {
            handleError(error, "Ops! Falha ao recarregar as transações.");
        } finally {
            handleLoadings({key: "refresh", value: false});
        }
    }

    useEffect(() => {
        (async () => {
            await Promise.all([
                handleFetchCategories(),
                handleFetchInitialTransactions()
            ])
        })();
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-stone-800">
            <FlatList 
                className="bg-stone-700"
                data={transactions}
                keyExtractor={({id}) => `transaction-${id}`} 
                renderItem={({item}) => <TransactionCard transaction={item} />}
                ListHeaderComponent={ListHeader}
                onEndReached={handleLoadMoreTransactions}
                ListEmptyComponent={loadings.initial ? null : EmptyList}
                onEndReachedThreshold={0.5}
                ListFooterComponent={loadings.loadMore ? 
                    <ActivityIndicator 
                        color={colors["accent-brand-light"]} 
                        size={"large"} /> : 
                        null} 
                refreshControl={<RefreshControl 
                refreshing={loadings.refresh} 
                onRefresh={handleRefreshTransactions}
                 />} />
        </SafeAreaView>
    )
}