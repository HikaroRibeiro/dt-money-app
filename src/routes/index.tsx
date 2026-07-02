import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export type PublicStackParamsList = {
    Login: undefined;
    Register: undefined;
}

const NavigationRoutes = () => {
    const PublicStackRoutes = createStackNavigator<PublicStackParamsList>()

    return (
        <NavigationContainer>
            <PublicStackRoutes.Navigator screenOptions={{ headerShown: false }}>
                <PublicStackRoutes.Screen name="Login" component={Login} />
                <PublicStackRoutes.Screen name="Register" component={Register} />
            </PublicStackRoutes.Navigator>
        </NavigationContainer>
    )
}

export default NavigationRoutes