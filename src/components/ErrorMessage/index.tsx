import { colors } from "@/shared/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { FC, PropsWithChildren } from "react"
import { View, Text } from "react-native"

export const ErrorMessage:FC<PropsWithChildren> = ({children}) => {
    return (
        <View className="flex-row items-center mt-1">
            <MaterialIcons 
                name="error-outline" 
                size={24} 
                color={colors["accent-red-background-primary"]}
                className="mr-1" />
            <Text className="text-sm text-red-600">{children}</Text>
        </View>
    )
}