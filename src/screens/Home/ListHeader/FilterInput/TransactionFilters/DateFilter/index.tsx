import { format } from "date-fns";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker";

export const DateFilter = () => {

    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const onStartCancel = () => {
        setShowStartDatePicker(false);
    }

    const onStartConfirm = (selectedDate: Date) => {
        setShowStartDatePicker(false);
    }

    const onEndCancel = () => {
        setShowEndDatePicker(false);
    }

    const onEndConfirm = (selectedDate: Date) => {
        setShowEndDatePicker(false);
    }

    return (
        <>
            <Text>
                Data
            </Text>
            <View className="flex-row justify-between items-center mb-6">
                <View className="w-[48%]">
                    <TouchableOpacity 
                        onPress={() => setShowStartDatePicker(true)} 
                        className="rounded-md p-2 border-b border-gray-600">
                        <Text className="text-white text-lg">{format(new Date(), "dd/MM/yyyy")}</Text>
                    </TouchableOpacity>
                </View>

                <View className="w-[48%]">
                    <TouchableOpacity 
                        onPress={() => setShowEndDatePicker(true)} 
                        className="rounded-md p-2 border-b border-gray-600">
                        <Text className="text-white text-lg">{format(new Date(), "dd/MM/yyyy")}</Text>
                    </TouchableOpacity>
                </View>

                <DateTimePicker 
                    isVisible={showStartDatePicker}
                    date={new Date()} 
                    mode="date" 
                    onConfirm={() => onStartConfirm} 
                    onCancel={() => onStartCancel}
                    confirmTextIOS="Confirmar"
                    cancelTextIOS="Cancelar"
                    locale="pt_BR" 
                />

                <DateTimePicker 
                    isVisible={showEndDatePicker}
                    date={new Date()} 
                    mode="date" 
                    onConfirm={() => onEndConfirm} 
                    onCancel={() => onEndCancel}
                    confirmTextIOS="Confirmar"
                    cancelTextIOS="Cancelar"
                    locale="pt_BR" 
                />
            </View>
        </>
    )
}