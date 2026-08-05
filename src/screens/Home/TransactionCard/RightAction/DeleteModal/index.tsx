import { colors } from "@/shared/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { FC } from "react"
import { Modal, TouchableWithoutFeedback, View, Text, TouchableOpacity, ActivityIndicator } from "react-native"


interface Params {
    visible: boolean;
    hideModal: () => void;
    handleDeleteTransaction: () => void;
    loading: boolean;
}

export const DeleteModal: FC<Params> = ({visible, hideModal, handleDeleteTransaction, loading}) => {
    return (
        <View className="flex-1 absolute">
            <Modal 
                animationType="slide" 
                transparent 
                visible={visible} 
                onRequestClose={hideModal}>

                <TouchableWithoutFeedback onPress={hideModal}>
                    <View className="flex-1 items-center justify-center bg-black/50">
                        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                            <View className="m-5 bg-stone-900 rounded-[16] p-8 items-center shadow-lg w-[90%] h-[322px] z-9">
                                <View className="w-full flex-row justify-between items-center border-b border-gray-300 pb-6">
                                    <View className="flex-row gap-6 items-center">
                                        <MaterialIcons className="mr-4" size={25} name="error-outline" color={colors.gray[400]} />
                                        <Text className="text-white text-xl">Apagar essa transação?</Text>
                                    </View>
                                    <TouchableOpacity>
                                        <MaterialIcons name="close" size={25} color={colors.gray[800]} onPress={hideModal} />
                                    </TouchableOpacity>
                                </View>

                                <View className="p-3 flex-1 border-b border-gray-300 items-center justify-center">
                                    <Text className="text-gray-500 text-lg leading-8">Tem certeza que deseja apagar essa transação? Esta ação não poderá ser desfeita.</Text>
                                </View>

                                <View className="flex-row justify-end gap-4 w-full p-6 pb-0 pr-0">
                                    <TouchableOpacity onPress={hideModal} className="w-[100px] bg-none border-2 border-green-600 items-center justify-center p-3 rounded-[6px]">
                                        <Text className="text-green-600 text-lg font-bold">Cancelar</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={handleDeleteTransaction} className="w-[100px] bg-none bg-red-600 items-center justify-center p-3 rounded-[6px]">
                                        <Text className="text-white text-lg font-bold">{loading ? <ActivityIndicator size="small" color={colors.white} /> : "Apagar"}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>    
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    )
}