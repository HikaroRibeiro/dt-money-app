import { colors } from "@/shared/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { useState } from "react";
import { TouchableOpacity } from "react-native"
import { DeleteModal } from "./DeleteModal";


export const RightAction = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    }

    const hideModal = () => {
        setModalVisible(false);
    }

    return (
        <>
            <TouchableOpacity 
                activeOpacity={0.8}
                className="h-[140] bg-red-700 w-[80] rounded-r-[6] items-center justify-center"
                onPress={showModal}>
                <MaterialIcons name="delete-outline" size={30} color={colors.white} />
            </TouchableOpacity>
            <DeleteModal visible={modalVisible} hideModal={hideModal} />
        </>

    )
}