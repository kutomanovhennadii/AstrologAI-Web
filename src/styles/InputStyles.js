import { StyleSheet } from "react-native";

import colors from './colors';
import designConstants from './designConstants';

const inputStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        overflow: "hidden",
        paddingTop: 5,
        // borderWidth: 1,
        // borderColor: "red"
    },
    width100: {
        width: "100%",
    },
    size100: {
        width: "100%",
        height: "100%",
    },
    width50: {
        width: '49%',
    },
    text: {
        fontSize: 16,
        letterSpacing: 1,
        lineHeight: 24,
        fontFamily: "Raleway-Regular",
        color: colors.textColor,
        textAlign: "left",
    },
    textAlignCenter: {
        textAlign: "center"
    },
    titleText: {
        fontSize: 23,
        lineHeight: 32,
        color: colors.textColor,
        textAlign: "left",
        fontFamily: "Raleway-Regular",
    },
    dateTextBox: {
        flex: 1,
        justifyContent: 'center', // Центрирование по вертикали
    },
    border: {
        //alignSelf: "stretch",
        borderRadius: designConstants.borderRadius,
        borderColor: colors.blueBell,
        borderWidth: designConstants.borderWidth,
        paddingHorizontal: designConstants.paddingHorizontal,
        paddingVertical: 0,
        height: designConstants.inputHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginTop: 2,
    },
    focused: {
        borderColor: colors.darkSeaGreen,
        //border: 3,
    },
    errorText: {
        fontSize: 16,
        fontFamily: "Raleway-Medium",
        letterSpacing: 1,
        color: "#FF1111",
        textAlign: "left",
        marginTop: 5,
    },
    scaledLogo: {
        paddingTop: 25,
        marginBottom: -20,
        transform: [{ scale: 0.5 }],
    },
    bottom10: {
        paddingBottom: 10,
    },
    left20: {
        marginLeft: 20,
    },
});

export default inputStyles;