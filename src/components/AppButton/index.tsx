import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { colors } from "@/shared/colors";

type AppButtonMode = "fill" | "outline"

interface IAppButtonParams extends TouchableOpacityProps {
    mode?: AppButtonMode,
    iconName: keyof typeof MaterialIcons.glyphMap
}

export const AppButton: FC<PropsWithChildren<IAppButtonParams>> = ({
    children, 
    mode="fill",
    iconName, 
    ...rest}) => {
    return (
       <TouchableOpacity className={clsx("w-full rounded-xl px-5 flex-row items-center justify-center h-button",iconName ? "justify-between":"justify-center", mode === "fill" ? "bg-emerald-600" : "bg-none border-[1px] border-emerald-600")} {...rest}>
            <Text className={clsx("text-lg font-bold", mode === "fill" ? "text-stone-200" : "text-emerald-600")}>{children}</Text>
            {iconName && <MaterialIcons name={iconName} size={24} color={mode === "fill" ? colors.white : colors["accent-brand"]} />}
       </TouchableOpacity>
    )
}