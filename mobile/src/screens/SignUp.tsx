import React from "react";
import { StyleSheet, View, Button, Alert } from "react-native";
import { TodoTextInput } from "../components/Input";
import { THEME } from "../styles/theme.styles";
import { TodoButton } from "../components/Button";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { ROUTER_KEYS } from "../keys/ROUTER_KEYS";
import { AuthSchema, IAuth } from "../type/authTypes";
import { userService } from "../servicies/user.service";

export const SignUp = ({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) => {
    const signUpMutate = useMutation(
        async (userData: IAuth) => userService.signUpUser("signup", userData),

        {
            onSuccess: () => {
                Alert.alert(
                    "User was created successfully. You are referred to login page. Click OK"
                );
                navigation.navigate(ROUTER_KEYS.LOGIN_PAGE);
            },
            onError: (error: any) => {
                Alert.alert(error);
            },
        }
    );

    const formik = useFormik({
        validationSchema: AuthSchema,
        initialValues: {
            email: "testSignUp@email.com",
            password: "1231231233",
        },

        onSubmit: (values) => {
            console.log("sign Up formik onSubmit values: ", values);
            signUpMutate.mutate(values);
        },
    });

    const goToLogin = () => {
        navigation.navigate(ROUTER_KEYS.LOGIN_PAGE);
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
                <TodoButton title={"CREATE"} onPress={formik.handleSubmit} />
            </View>
            <View style={styles.btnConteiner}>
                <Button title="GO BACK" onPress={goToLogin} color="#841584" />
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
