// @ts-ignore
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamsList } from "../Login";
import { AppButton } from "@/components/AppButton";


export const Home = () => {

    const navigate = useNavigation<StackNavigationProp<PublicStackParamsList>>();

    return (
        <View className="flex-1 justify-center items-center ml-4 mr-4">
            <Text>Página Home</Text>
            <AppButton 
                mode="fill" 
                iconName="logout" 
                onPress={() => navigate.navigate("Login")}>
                    Sair
            </AppButton>
            
        </View>
    )
}