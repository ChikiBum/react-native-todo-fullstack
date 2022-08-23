import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { TodoTextInput } from "../components/Input";
import { THEME } from "../styles/theme.styles";
import { TodoButton } from "../components/Button";
import { useFormik } from "formik";
import { useMutation, useQuery } from "react-query";
import { ROUTER_KEYS } from "../keys/ROUTER_KEYS";
import { QUERY_KEYS } from "../keys/QUERY_KEYS";
import { useQueryClient } from "react-query";
import { AuthSchema, IAuth } from "../type/authTypes";
import { userService } from "../servicies/user.service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginPage = ({ navigation }: { navigation: any }) => {
    const queryClient = useQueryClient();
    const loginMutate = useMutation(
        (userData: IAuth) => userService.login("signin", userData),

        {
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_KEYS.TODOS);
            },
            onError: (error: any) => {
                console.log("LoginPage error: ", error);
                navigation.navigate(ROUTER_KEYS.SIGN_UP);
            },
        }
    );

    const formik = useFormik({
        validationSchema: AuthSchema,
        initialValues: {
            email: "test123@email.com",
            password: "1231231233",
        },

        onSubmit: async (values) => {
            await AsyncStorage.clear();
            const { token } = await loginMutate.mutateAsync(values);

            await AsyncStorage.setItem("token", token);

            navigation.navigate(ROUTER_KEYS.APP);
        },
    });

    const goToSignUp = () => {
        navigation.navigate(ROUTER_KEYS.SIGN_UP);
    };

    return (
        <View style={styles.continer}>
            <TodoTextInput
                text={"email"}
                formik={formik}
                handlerName={"email"}
                value={formik.values.email}
                error={formik.errors.email}
                touched={formik.touched.email}
            />

            <TodoTextInput
                text={"password"}
                formik={formik}
                handlerName={"password"}
                value={formik.values.password}
                error={formik.errors.password}
                touched={formik.touched.password}
            />

            <View style={styles.btnConteiner}>
                <TodoButton title={"Sign In"} onPress={formik.handleSubmit} />
            </View>
            <View style={styles.btnConteiner}>
                <Button title="Sign UP" color="#841584" onPress={goToSignUp} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        height: THEME.percent.per100,
        backgroundColor: THEME.Colors.containerBg,
    },
    btnConteiner: {
        alignItems: "center",
        marginTop: THEME.Pixel.px40,
    },
});
