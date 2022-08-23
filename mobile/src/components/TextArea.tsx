import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Textarea from "react-native-textarea";
import { THEME } from "../styles/theme.styles";

interface ITextArea {
    text: string;
    value: string;
    formik: any;
    handlerName: string;

    error:
        | string
        | string[]
        | FormikErrors<any>
        | FormikErrors<any>[]
        | undefined;
    touched: boolean | FormikTouched<any> | FormikTouched<any>[] | undefined;
}

export const TextArea: React.FC<ITextArea> = ({
    text,
    formik,
    handlerName,
    value,
    error,
    touched,
}) => {
    return (
        <View style={styles.continer}>
            <View style={styles.textCont}>
                <Text style={styles.text}> {text}</Text>
                {touched && error ? (
                    <Text style={styles.textEror}>{error}</Text>
                ) : null}
            </View>

            <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                value={value}
                onChangeText={formik.handleChange(handlerName)}
                maxLength={THEME.Pixel.px100}
                onBlur={formik.handleBlur(handlerName)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    continer: {
        flexDirection: "column",
        alignItems: "center",
        height: THEME.Pixel.px30,
        marginTop: THEME.Pixel.px40,
    },
    textCont: {
        flexDirection: "row",
        width: THEME.Pixel.px250,
        alignItems: "center",
    },
    text: {
        fontSize: THEME.Fonts.fs20,
        marginRight: THEME.Pixel.px10,
    },
    textEror: {
        color: THEME.Colors.red,
        fontSize: THEME.Fonts.fs15,
    },

    textareaContainer: {
        height: THEME.Pixel.px150,
        width: THEME.Pixel.px250,
        padding: THEME.Pixel.px10,
        borderStyle: "solid",
        borderWidth: THEME.Pixel.px2,
        borderColor: "black",
    },
    textarea: {
        textAlignVertical: "top",
        height: THEME.Pixel.px150,
    },
});
