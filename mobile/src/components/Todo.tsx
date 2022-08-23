import React, { FC, useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import { todoService } from "../servicies/todo.service";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { ITodo } from "../type/todoTypes";
import { ROUTER_KEYS } from "../keys/ROUTER_KEYS";
import { QUERY_KEYS } from "../keys/QUERY_KEYS";
import { THEME } from "../styles/theme.styles";

type Props = {
    todo: ITodo;
    navigation: any;
};

export const Todo: FC<Props> = ({ todo, navigation }) => {
    const queryClient = useQueryClient();

    const deleteTodo = useMutation(
        async (id: string) => todoService.deleteTodo(id),

        {
            onSuccess: () => {
                queryClient.invalidateQueries(QUERY_KEYS.TODOS);
            },
            onError: (error: any) => {
                console.log(error);
            },
        }
    );

    const handleOnDelete = useCallback(
        () => deleteTodo.mutate(todo._id),
        [todo._id]
    );

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(ROUTER_KEYS.WATCH_TODO, {
                    todoData: todo,
                });
            }}
        >
            <View style={styles.wrapper}>
                <Text style={styles.text}>{todo.title}</Text>
                <View style={styles.buttonsWrapper}>
                    <Button
                        color="red"
                        title="Delete"
                        onPress={handleOnDelete}
                    />
                    <Button
                        color="green"
                        title="Edit"
                        onPress={() => {
                            navigation.navigate(ROUTER_KEYS.EDIT_TODO, {
                                todoData: todo,
                            });
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: THEME.Pixel.px5,
        borderWidth: THEME.Pixel.px1,
        borderColor: THEME.Colors.gray,
        borderRadius: THEME.Pixel.px5,
        marginBottom: THEME.Pixel.px5,
    },
    buttonsWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: THEME.percent.per35,
    },
    text: {
        maxWidth: THEME.percent.per60,
        overflow: "hidden",
    },
});
