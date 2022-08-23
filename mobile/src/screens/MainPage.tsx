import React, { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Filters } from "../components/Filters";
import { NavBar } from "../components/NavBar";
import { THEME } from "../styles/theme.styles";
import TodoList from "../components/TodoList";

type Props = {
    navigation: any;
};

const MainPage: FC<Props> = ({ navigation }) => {
    const [isCopleted, setIsCopleted] = useState<boolean>(false);
    const [todoTitle, setTodoTitle] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [dataCount, setDataCount] = useState<number>(0);

    const limit = 8;
    const startIndex = 0;
    let endIndex = 0;
    if (dataCount > page * limit) {
        endIndex = page * limit;
    }

    return (
        <View style={styles.container}>
            <NavBar />
            <Filters
                setIsCopleted={setIsCopleted}
                setTodoTitle={setTodoTitle}
            />
            <TodoList
                queryParams={{
                    isCopleted,
                    todoTitle,
                    startIndex,
                    endIndex,
                }}
                navigation={navigation}
                setPage={setPage}
                setDataCount={setDataCount}
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
    },
});

export default MainPage;
