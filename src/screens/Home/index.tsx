// @ts-ignore
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "../Login";
import { AppButton } from "@/components/AppButton";
import { useAuthContext } from "@/context/auth.context";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";


export const Home = () => {

    const navigate = useNavigation<StackNavigationProp<PublicStackParamsList>>();
    const {handleLogout} = useAuthContext();

    return (
        <DismissKeyboardView>
            <View className="flex-1 w-[82%] self-center mt-10">
                <View className="flex-row items-center justify-between">
                    <Text className="text-2xl font-bold text-green-600 mr-2">Home</Text>
                    <AppButton 
                        style={{width: 100}} 
                        iconName="logout" 
                        mode="fill" 
                        onPress={() => handleLogout()}>Sair
                    </AppButton>            
                </View>
            </View>
        </DismissKeyboardView>
    )
}