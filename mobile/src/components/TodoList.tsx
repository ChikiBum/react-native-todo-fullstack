import React, { FC, useEffect, Dispatch, SetStateAction } from "react";
import { StyleSheet, View, FlatList, Button, Text } from "react-native";
import { ROUTER_KEYS } from "../keys/ROUTER_KEYS";
import { QUERY_KEYS } from "../keys/QUERY_KEYS";
import { Todo } from "./Todo";
import { useQuery } from "react-query";
import { todoService } from "../servicies/todo.service";
import { THEME } from "../styles/theme.styles";
import { TodoQueryParams } from "../type/todoTypes";

type Props = {
    navigation: any;
    queryParams: TodoQueryParams;
    setPage: Dispatch<SetStateAction<number>>;
    setDataCount: Dispatch<SetStateAction<number>>;
};

const TodoList: FC<Props> = ({
    navigation,
    queryParams,
    setPage,
    setDataCount,
}) => {
    const goToCreateTodo = () => {
        navigation.navigate(ROUTER_KEYS.CREATE_TODO);
    };

    const { data, isLoading, isSuccess, refetch } = useQuery(
        QUERY_KEYS.TODOS,
        async () => todoService.fetchTodos(queryParams),
        { refetchOnMount: true }
    );
    // eslint-disable-next-line linebreak-style

    useEffect(() => {
        refetch();
    }, [queryParams]);

    useEffect(() => {
        setDataCount(dataCount);
    }, []);

    if (isLoading) return <Text>{isLoading}</Text>;

    if (!isSuccess) {
        return <Text>Error TodoList</Text>;
    }

    const { todoData, dataCount } = data;

    return (
        <View style={styles.container}>
            <View style={styles.todoWrapper}>
                <FlatList
                    keyExtractor={(item) => item._id}
                    data={todoData}
                    renderItem={({ item }) => (
                        <Todo todo={item} navigation={navigation} />
                    )}
                    onEndReachedThreshold={0.95}
                    onEndReached={() => setPage((prev) => prev + 1)}
                />
            </View>
            <Button
                color={THEME.Colors.containerBg}
                title="Create TODO"
                onPress={goToCreateTodo}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    todoWrapper: {
        paddingHorizontal: THEME.Pixel.px10,
        paddingVertical: THEME.Pixel.px10,
        height: THEME.percent.per80,
    },
});

export default TodoList;
