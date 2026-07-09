import { useSnackbarContext } from "@/context/snackbar.context";
import { View, Text } from "react-native"

export const Snackbar = () => {
    const { message, type } = useSnackbarContext();

    if (!message || !type) {
        return <></>;
    }

    const bgColor = `${type === "SUCCESS" ? "bg-emerald-600" : "bg-red-600"}`;

    return (
        <View className={`
            absolute bottom-10 self-center w-[90%] h-[50px] rounded-xl
            ${bgColor} justify-center z-10 p-2
        `}>
            <Text className="text-white text-base font-bold">{message}</Text>
        </View>
    )
}