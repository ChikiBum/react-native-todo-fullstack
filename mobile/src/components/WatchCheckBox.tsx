import React from "react";
import { View, StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { THEME } from "../styles/theme.styles";

interface Props {
    text: string;
    isChecked: boolean;
}

export const WatchCheckBox: React.FC<Props> = ({ text, isChecked }) => {
    return (
        <View style={styles.checkboxContainer}>
            <BouncyCheckbox
                fillColor={THEME.Colors.black}
                unfillColor={THEME.Colors.white}
                text={text}
                isChecked={isChecked}
                disableBuiltInState
                textStyle={{
                    textDecorationLine: "none",
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: THEME.Pixel.px250,
        marginTop: THEME.Pixel.px10,
    },

    label: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: THEME.Pixel.px50,
    },
});
