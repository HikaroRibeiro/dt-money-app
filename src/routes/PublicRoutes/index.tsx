import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";

export type PublicStackParamsList = {
    Login: undefined;
    Register: undefined;
}

export const PublicRoutes = () => {
    const PublicStackRoutes = createStackNavigator<PublicStackParamsList>()
    return (
            <PublicStackRoutes.Navigator screenOptions={{ headerShown: false }}>
                <PublicStackRoutes.Screen name="Login" component={Login} />
                <PublicStackRoutes.Screen name="Register" component={Register} />
            </PublicStackRoutes.Navigator>
    );
};