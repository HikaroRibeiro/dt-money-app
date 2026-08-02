import { colors } from "@/shared/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { FC } from "react"
import { Modal, TouchableWithoutFeedback, View, Text, TouchableOpacity } from "react-native"


interface Params {
    visible: boolean
    hideModal: () => void
}

export const DeleteModal: FC<Params> = ({visible, hideModal}) => {
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
                            </View>    
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    )
}