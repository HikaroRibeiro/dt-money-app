import { useTransactionContext } from "@/context/transaction.context";
import clsx from "clsx"
import { FC, useMemo, useState } from "react";
import { TouchableOpacity, Text, Modal, View, TouchableWithoutFeedback, FlatList } from "react-native"
import { Checkbox } from "expo-checkbox";

interface Props {
    selectedCategory: number,
    onSelect: (categoryId: number) => void
}
export const SelectCategoryModal: FC<Props> = ({
    selectedCategory,
    onSelect
}) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const {categories} = useTransactionContext();

    const toggleModal = () => {
        setModalVisible((prevState) => !prevState);
    };

    const handleSelect = (categoryId: number) => {
        onSelect(categoryId);
        toggleModal();
    }

    const selected = useMemo(
        () => categories.find(({id}) => id === selectedCategory),[categories, selectedCategory]
    );

    return (
        <>
            <TouchableOpacity 
                onPress={toggleModal} 
                className="h-[50px] bg-black my-2 rounded[6px] pl-4 justify-center">
                <Text className={clsx("text-lg", selected ? "text-white" : "text-gray-700")}>{selected?.name ?? "Categoria"}</Text>
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent animationType="slide">
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View className="flex-1 bg-black/50 justify-center items-center">
                        <View className="bg-stone-900 w-[90%] rounded-xl p-4">
                            <Text className="text-white text-lg mb-4">Selecione uma categoria</Text>
                            <FlatList 
                                keyExtractor={item => `category-${item.id}`}
                                data={categories}
                                renderItem={({item}) => (
                                    <TouchableOpacity 
                                        onPress={() => handleSelect(item.id)} 
                                        className="flex-row items-center bg-stone-800 rounded-lg mb-2 p-4">

                                        <Checkbox 
                                            value={selected?.id === item.id}
                                            onValueChange={() => handleSelect(item.id)}
                                            className="mr-2"
                                         />

                                        <Text className="text-white text-lg">{item.name}</Text>

                                    </TouchableOpacity>     
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                
            </Modal>
        </>
    )
}