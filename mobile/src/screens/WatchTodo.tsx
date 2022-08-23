import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { THEME } from "../styles/theme.styles";
import { WatchCheckBox } from "../components/WatchCheckBox";

export const WatchTodo = ({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) => {
    const { todoData } = route.params;

    return (
        <View style={styles.continer}>
            <View style={styles.textContiner}>
                <Text style={styles.text}>Title: {todoData.title}</Text>
                <Text style={styles.text}>
                    Description: {todoData.description}
                </Text>
                <Text style={styles.text}>Year: {todoData.year}</Text>
            </View>

            <View style={styles.checkConteiner}>
                <WatchCheckBox
                    text={"Complited"}
                    isChecked={todoData.completed}
                />
                <WatchCheckBox text={"Public"} isChecked={todoData.public} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        height: THEME.percent.per100,
        backgroundColor: THEME.Colors.containerBg,
    },
    checkConteiner: {
        marginTop: THEME.Pixel.px50,
        paddingHorizontal: THEME.Pixel.px40,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    textContiner: {
        height: THEME.percent.per60,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: THEME.Pixel.px15,
    },
    text: {
        flex: 1,
        width: THEME.percent.per100,
        marginTop: THEME.Pixel.px50,
        fontSize: THEME.Fonts.fs24,
    },
});
