import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TodoTextInput } from "../components/Input";
import { THEME } from "../styles/theme.styles";
import { TextArea } from "../components/TextArea";
import { TodoCheckBox } from "../components/CheckBox";
import { TodoButton } from "../components/Button";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { ROUTER_KEYS } from "../keys/ROUTER_KEYS";
import { QUERY_KEYS } from "../keys/QUERY_KEYS";
import { todoService } from "../servicies/todo.service";
import { useQueryClient } from "react-query";
import { ITodo, TodoSchema } from "../type/todoTypes";

export const EditTodo = ({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) => {
    const queryClient = useQueryClient();
    const { todoData } = route.params;
    const editTodo = useMutation(
        async (data: ITodo) => todoService.updateTodo(todoData._id, data),

        {
            onSuccess: () => {
                navigation.navigate(ROUTER_KEYS.APP);
                queryClient.invalidateQueries(QUERY_KEYS.TODOS);
            },
            onError: (error: any) => {
                console.log(error);
            },
        }
    );

    const formik = useFormik({
        validationSchema: TodoSchema,
        initialValues: todoData,

        onSubmit: (values) => {
            editTodo.mutate(values);
        },
    });

    return (
        <View style={styles.continer}>
            <TodoTextInput
                text={"Title"}
                formik={formik}
                handlerName={"title"}
                value={formik.values.title}
                error={formik.errors.title}
                touched={formik.touched.title}
            />
            <TextArea
                text={"Description"}
                formik={formik}
                handlerName={"description"}
                value={formik.values.description}
                error={formik.errors.description}
                touched={formik.touched.description}
            />
            <View style={styles.inputContiner}>
                <TodoTextInput
                    text={"Year"}
                    formik={formik}
                    handlerName={"year"}
                    value={formik.values.year.toString()}
                    error={formik.errors.year}
                    touched={formik.touched.year}
                />
            </View>

            <View style={styles.checkConteiner}>
                <TodoCheckBox
                    text={"Complited"}
                    formik={formik}
                    name={"completed"}
                    value={formik.values.completed}
                />
                <TodoCheckBox
                    text={"Private"}
                    formik={formik}
                    name={"public"}
                    value={formik.values.public}
                />
            </View>
            <View style={styles.btnConteiner}>
                <TodoButton
                    title={"Save changes"}
                    onPress={formik.handleSubmit}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        height: THEME.percent.per100,
        backgroundColor: THEME.Colors.containerBg,
    },
    inputContiner: {
        marginTop: THEME.Pixel.px150,
    },
    checkConteiner: {
        marginTop: 50,
        justifyConten: "center",
        alignItems: "center",
    },
    btnConteiner: {
        alignItems: "center",

        marginTop: 50,
    },
});
