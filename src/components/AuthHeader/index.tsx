import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";
import { View, Text, Image } from "react-native"

export const AuthHeader = () => {

    const isKeyboardVisible = useKeyboardVisible();

    if(isKeyboardVisible) {
        return <></>;
    }

    return (
        <View className="justify-center items-center w-full min-h-40">
            <Image source={require("@/assets/Logo.png")} className="h-[48px] w-[255px]" />
        </View>
    )
}