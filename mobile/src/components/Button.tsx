import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { THEME } from "../styles/theme.styles";

type PropsButton = {
    title: string;
    onPress: () => void;
};
export const TodoButton: React.FC<PropsButton> = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.5}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: THEME.Pixel.px150,
        height: THEME.Pixel.px40,
        backgroundColor: THEME.Colors.black,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: THEME.Colors.white,
        fontSize: THEME.Fonts.fs20,
    },
});
