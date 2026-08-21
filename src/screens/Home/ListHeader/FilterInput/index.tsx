import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/shared/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { TransactionFilters } from "./TransactionFilters";

export const FilterInput = () => {

    const { pagination, setSearchText, searchText, fetchTransactions } = useTransactionContext();
    const { openBottomSheet } = useBottomSheetContext();

    const [text, setText] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchText(text);
        }, 1000);

        return () => {
            clearTimeout(handler);
        }
    },[text])

    useEffect(() => {
        (async () => {
            try {
                await fetchTransactions({page: 1});
            } catch (error) {
                console.log(error);
            }
        })();
    },[searchText])

    function showText() {
        console.log(text);
    }

    return (
        <View className="mb-4 w-[90%] self-center">
            <View className="w-full flex-row justify-between items-center mt-4 mb-3">
                <Text className="text-white text-xl font-bold">Transações Cadastradas</Text>
                <Text className="text-gray-400 text-base">{pagination.totalRows} {pagination.totalRows === 1 ? "Item" : "Items"}</Text>
            </View>
            <TouchableOpacity
             className="flex-row items-center justify-between h-16">
                <TextInput
                    value={text}
                    onChangeText={setText}
                    className="h-[50px] text-white text-lg w-full bg-stone-800 pl-4 rounded-[6px]" 
                    placeholder="Busque por uma transação..." 
                    placeholderTextColor={colors.gray[600]} />
                    <TouchableOpacity 
                        onPress={() => openBottomSheet(<TransactionFilters />, 1)} 
                        className="absolute right-0">
                        <MaterialIcons 
                            name="filter-list" 
                            size={24} 
                            color={colors.gray[600]}
                            className="mr-3" />
                    </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}