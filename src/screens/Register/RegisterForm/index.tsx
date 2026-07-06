import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { PublicStackParamsList } from "@/screens/Login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native"
import { registerSchema } from "./schema";

export interface IRegisterFormData {
    email: string;
    name: string;
    password: string;
    confirmPassword: string
}
export const RegisterForm = () => {
    const navigate = useNavigation<StackNavigationProp<PublicStackParamsList>>();
    const { 
        control,
        formState: { isSubmitting },
        handleSubmit
     } = useForm<IRegisterFormData>({
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: ""
        },
        resolver: yupResolver(registerSchema),
     });

     const onSubmit = async () => {
        
     }

    return (
        <View>
            <AppInput 
                control={control} 
                name="name" 
                label="Nome:" 
                placeholder="Seu nome de usuário."
                leftIconName="person"
            />
            <AppInput 
                control={control} 
                name="email" 
                label="E-mail:" 
                placeholder="mail@example.com."
                leftIconName="mail-outline"
            />
            <AppInput 
                control={control} 
                name="password" 
                label="Password:" 
                placeholder="Sua senha aqui."
                leftIconName="lock-outline"
                secureTextEntry
            />
            <AppInput 
                control={control} 
                name="confirmPassword" 
                label="Confirme seu Password:" 
                placeholder="Repita a sua senha aqui."
                leftIconName="lock-outline"
                secureTextEntry
            />
            <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
                <AppButton onPress={handleSubmit(onSubmit)} iconName="arrow-forward" disabled={isSubmitting}>
                    Cadastrar
                </AppButton>

                <View>
                    <Text className="mb-6 text-base text-gray-300">
                        Não possui uma conta?
                    </Text>
                    <AppButton onPress={() => navigate.navigate("Login")} iconName="arrow-forward" mode="outline" disabled={isSubmitting}>
                        Acessar
                    </AppButton>
                </View>

            </View>
        </View>
    )
}