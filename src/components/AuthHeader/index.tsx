import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";
import { View, Text, Image, TouchableOpacity } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors";
import { useAuthContext } from "@/context/auth.context";
import { useBottomSheetContext } from "@/context/bottomsheet.context";

export const AuthHeader = () => {

    const isKeyboardVisible = useKeyboardVisible();

    if(isKeyboardVisible) {
        return <></>;
    }

    const {handleLogout} = useAuthContext()
    const {openBottomSheet, closeBottomSheet} = useBottomSheetContext()

    return (
        <View className="w-full flex-row items-center justify-between p-8">
            <View>
                <Image source={require("@/assets/Logo.png")} className="h-[30px] w-[130px]" />
                <TouchableOpacity className="mt-2 flex-row items-center gap-2" onPress={handleLogout}>
                    <MaterialIcons name="logout" size={15} color={colors.gray[700]} />
                    <Text className="text-base text-gray-500">Sair da conta</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                className="bg-emerald-600 w-[130px] h-[50px] items-center justify-center rounded-xl"
                onPress={() => openBottomSheet(<Text>Formulário da nova Transação!</Text>,0)}>
                <Text className="text-white text-sm font-bold">Nova transação</Text>
            </TouchableOpacity>
        </View>
   
    )
}