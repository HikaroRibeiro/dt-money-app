
import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { AuthHeader } from "@/components/AuthHeader";
import App from "App";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";

export interface ILoginFormData {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const { 
        control, 
        formState: { isSubmitting }, 
        handleSubmit } = useForm<ILoginFormData>();
    return (
        <View>
            <AuthHeader />
            <AppInput 
                control={control} 
                name="email" 
                label="Email" 
                placeholder="mail@example.com"
                leftIconName="mail-outline"
            />
            <AppInput 
                control={control} 
                name="password" 
                label="Password" 
                placeholder="Your password here."
                className="flex-1 text-base text-gray-500"
                secureTextEntry
                leftIconName="lock-outline"
            />
            <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
                <AppButton iconName="arrow-forward" disabled={isSubmitting}>
                    Login
                </AppButton>

                <View>
                    <Text className="mb-6 text-base text-gray-300">
                        Não possui uma conta?
                    </Text>
                    <AppButton iconName="arrow-forward" mode="outline" disabled={isSubmitting}>
                        Cadastrar
                    </AppButton>
                </View>

            </View>
        </View>
    );
};