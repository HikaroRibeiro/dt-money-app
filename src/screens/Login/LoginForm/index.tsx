
import { AppInput } from "@/components/AppInput";
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
        </View>
    );
};