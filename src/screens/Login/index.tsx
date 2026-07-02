import { PublicStackParamsList } from "@/routes";
import { useNavigation } from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';

export function Login() {

    const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>();

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Tela de login!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text>Ir para tela de cadastro</Text>
            </TouchableOpacity>
        </View>
    );
}