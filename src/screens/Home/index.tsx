// @ts-ignore
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "../Login";
import { useAuthContext } from "@/context/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthHeader } from "@/components/AuthHeader";
import { useEffect } from "react";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";


export const Home = () => {

    const navigate = useNavigation<StackNavigationProp<PublicStackParamsList>>();
    const {handleLogout} = useAuthContext();
    const {fetchCategories} = useTransactionContext();
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
            await handleFetchCategories();
        })();
    }, [])

    return (
        <SafeAreaView className="flex-1 bg-stone-800">
            <AuthHeader />
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}