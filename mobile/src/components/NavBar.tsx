import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../styles/theme.styles";

export const NavBar = () => {
    return (
        <View style={styles.wrapper}>
            <Text>To-do App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: THEME.Pixel.px50,
        width: THEME.percent.per100,
        paddingBottom: THEME.Pixel.px10,
        backgroundColor: THEME.Colors.containerBg,
        alignItems: "center",
        justifyContent: "flex-end",
    },
});
