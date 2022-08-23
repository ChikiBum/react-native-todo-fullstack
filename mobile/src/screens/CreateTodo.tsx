import React from "react";
import { todoService } from "../servicies/todo.service";
import { useQueryClient } from "react-query";
import { StyleSheet, View } from "react-native";
import { TodoTextInput } from "../components/Input";
import { TextArea } from "../components/TextArea";
import { TodoCheckBox } from "../components/CheckBox";
import { TodoButton } from "../components/Button";
import { useFormik } from "formik";
import { useMutation } from "react-query";
import { ROUTER_KEYS } from "../keys/ROUTER_KEYS";
import { QUERY_KEYS } from "../keys/QUERY_KEYS";
import { ITodo, TodoSchema } from "../type/todoTypes";
import { THEME } from "../styles/theme.styles";

export const CreateTodo = ({ navigation }: { navigation: any }) => {
    const queryClient = useQueryClient();

    const createTodo = useMutation(
        async (data: ITodo) => todoService.addTodo(data),

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
        initialValues: {
            title: "new toDo 30",
            description: "new toDo 30",
            year: "2022",
            completed: false,
            public: false,
        },

        onSubmit: (values) => {
            createTodo.mutate(values);
        },
    });

    return (
        <View style={styles.continer}>
            <TodoTextInput
                text={"Title"}
                formik={formik}
                handlerName={"title"}
                error={formik.errors.title}
                value={formik.values.title}
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
                    value={formik.values.year}
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
                    text={"Public"}
                    formik={formik}
                    name={"public"}
                    value={formik.values.public}
                />
            </View>
            <View style={styles.btnConteiner}>
                <TodoButton title={"Create"} onPress={formik.handleSubmit} />
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
        marginTop: THEME.Pixel.px50,
        justifyContent: "center",
        alignItems: "center",
    },
    btnConteiner: {
        alignItems: "center",
        marginTop: THEME.Pixel.px50,
    },
});
