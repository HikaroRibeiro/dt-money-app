import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { TextInputProps, View, Text, TouchableOpacity, Alert } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
import { colors } from "@/shared/colors";
import { useRef, useState } from "react";
import clsx from "clsx";
import { ErrorMessage } from "../ErrorMessage";

interface IAppInputParams<T extends FieldValues> extends TextInputProps {
    control: Control<T>;
    name: Path<T>;
    leftIconName?: keyof typeof MaterialIcons.glyphMap;
    label?: string;
}
export const AppInput = <T extends FieldValues>({ 
    control, 
    name, 
    leftIconName, 
    label,
    secureTextEntry, 
    ...rest}: IAppInputParams<T>) => {
    
    const inputRef = useRef<TextInput>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    const checkIsFocused = () => {
        if (inputRef.current) {
            setIsFocused(inputRef.current.isFocused());
        }
    }

    return (
        <Controller 
            control={control} 
            name={name} 
            render={({ field: { onChange, value}, fieldState: { error } }) => {
                console.log(error);
                return (
                <View className="w-full mt-4">
                    {label && <Text className={clsx("text-base mt-3 mb-2", isFocused ? "text-emerald-600" : "text-gray-600")}>{label}</Text>}
                    <TouchableOpacity 
                        className="flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16">
                        {leftIconName && 
                            <MaterialIcons 
                                name={leftIconName} 
                                color={isFocused ? colors["accent-brand"] : colors.gray[600]} 
                                size={24}
                                className="mr-2" 
                            />}
                        <TextInput 
                            className="flex-1 text-base"
                            {...rest} 
                            value={value} 
                            onChangeText={onChange}
                            placeholderTextColor={colors.gray[700]}
                            ref={inputRef}
                            onFocus={checkIsFocused}
                            onEndEditing={checkIsFocused}
                            secureTextEntry={isSecure}
                        />
                        { secureTextEntry && 
                            (
                                <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                                    <MaterialIcons 
                                        name={isSecure ? "visibility-off" : "visibility"} 
                                        color={isFocused ? colors["accent-brand"] : colors.gray[600]} 
                                        size={24}
                                    />
                                </TouchableOpacity>
                            ) } 
                    </TouchableOpacity>
                    {error && (
                        <ErrorMessage>{error.message}</ErrorMessage>
                    )}
                </View>
                )
            }} />
    )
}