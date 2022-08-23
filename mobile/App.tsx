import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";

import { ROUTER_KEYS } from "./src/keys/ROUTER_KEYS";
import { StatusBar } from "expo-status-bar";
import { EditTodo } from "./src/screens/EditTodo";
import { CreateTodo } from "./src/screens/CreateTodo";
import { WatchTodo } from "./src/screens/WatchTodo";
import { LoginPage } from "./src/screens/LoginPage";
import { SignUp } from "./src/screens/SignUp";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainPage from "./src/screens/MainPage";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
    return (
        <NavigationContainer>
            <QueryClientProvider client={queryClient}>
                <Stack.Navigator initialRouteName={ROUTER_KEYS.LOGIN_PAGE}>
                    <Stack.Screen
                        name={ROUTER_KEYS.APP}
                        component={MainPage}
                        options={{ title: ROUTER_KEYS.APP }}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.EDIT_TODO}
                        component={EditTodo}
                        options={{ title: ROUTER_KEYS.EDIT_TODO }}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.CREATE_TODO}
                        component={CreateTodo}
                        options={{ title: ROUTER_KEYS.CREATE_TODO }}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.WATCH_TODO}
                        component={WatchTodo}
                        options={{ title: ROUTER_KEYS.WATCH_TODO }}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.LOGIN_PAGE}
                        component={LoginPage}
                        options={{ title: ROUTER_KEYS.LOGIN_PAGE }}
                    />
                    <Stack.Screen
                        name={ROUTER_KEYS.SIGN_UP}
                        component={SignUp}
                        options={{ title: ROUTER_KEYS.SIGN_UP }}
                    />
                </Stack.Navigator>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <StatusBar style="auto" />
        </NavigationContainer>
    );
}
