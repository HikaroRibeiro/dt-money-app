import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { LoginForm } from "./LoginForm";
import { View } from "react-native";
import { useAuthContext } from "@/context/auth.context";

export type PublicStackParamsList = {
  Login: undefined
  Register: undefined
}

export const Login = () => {

  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <LoginForm />
      </View>
    </DismissKeyboardView>
  )
}