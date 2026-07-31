import { AuthHeader } from "@/components/AuthHeader"
import { ScrollView, View, Text } from "react-native"

export const ListHeader = () => {
    return (
        <>
            <AuthHeader />
            <View className="h-[150] w-full">
                <View className="h-[50px] w-full bg-stone-700" />
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    className="absolute pl-6 h-[141px]">
                    <Text className="text-white text-2xl font-bold"> Teste 1</Text>
                    <Text className="text-white text-2xl font-bold"> Teste 2</Text>
                    <Text className="text-white text-2xl font-bold"> Teste 3</Text>
                    <Text className="text-white text-2xl font-bold"> Teste 4</Text>
                    <Text className="text-white text-2xl font-bold"> Teste 5</Text>
                    <Text className="text-white text-2xl font-bold"> Teste 6</Text> 
                </ScrollView>
            </View>
        </>
    )
}