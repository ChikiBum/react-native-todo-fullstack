import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { THEME } from "../styles/theme.styles";
import { FormikValues } from "formik";

interface Props {
    text: string;
    value: boolean;
    formik?: FormikValues;
    name?: string;
}

export const TodoCheckBox: React.FC<Props> = ({
    text,
    value,
    formik,
    name,
}) => {
    return (
        <View style={styles.checkboxContainer}>
            <BouncyCheckbox
                onPress={(checked) => formik?.setFieldValue(name, checked)}
                fillColor={THEME.Colors.black}
                unfillColor={THEME.Colors.white}
                text={text}
                isChecked={value}
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
