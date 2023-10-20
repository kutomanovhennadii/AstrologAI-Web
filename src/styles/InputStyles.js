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
        fontSize: 14,
        color: "red",
        textAlign: "left",
        marginTop: 5,
    },

});

export default inputStyles;