import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { THEME } from "../styles/theme.styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
    setIsCopleted: React.Dispatch<React.SetStateAction<boolean>>;
    setTodoTitle: React.Dispatch<React.SetStateAction<string>>;
};

export const Filters = ({ setIsCopleted, setTodoTitle }: Props) => {
    const [isCopletedCheked, setIsCopletedCheked] = useState<boolean>(false);

    const isCompletedHandler = () => {
        setIsCopletedCheked((prev) => !prev);
        setIsCopleted((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text}>Filters</Text>
            </View>
            <TextInput
                placeholder={"Enter title name "}
                style={styles.input}
                onChangeText={(text) => setTodoTitle(text)}
            />
            <View style={styles.checkboxContainer}>
                <BouncyCheckbox
                    textStyle={{
                        textDecorationLine: "none",
                    }}
                    fillColor={THEME.Colors.black}
                    isChecked={isCopletedCheked}
                    text={"Show complited"}
                    onPress={isCompletedHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: THEME.Pixel.px5,
        marginHorizontal: THEME.Pixel.px10,
        paddingHorizontal: THEME.Pixel.px10,
        borderWidth: THEME.Pixel.px1,
        borderRadius: THEME.Pixel.px5,
    },
    input: {
        borderWidth: THEME.Pixel.px1,
        borderColor: THEME.Colors.black,
        padding: THEME.Pixel.px10,
    },
    text: {
        fontSize: THEME.Fonts.fs20,
    },
    title: {
        width: THEME.Pixel.px100,
        alignItems: "center",
        marginBottom: THEME.Pixel.px10,
    },
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: THEME.Pixel.px250,
        marginTop: THEME.Pixel.px10,
        marginBottom: THEME.Pixel.px15,
    },
});
