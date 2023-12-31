import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import designConstants from '../../styles/designConstants';

const SubmitButton = ({ text, onSubmit }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    //console.log("SubmitButton onPress");
                    onSubmit();
                }}
            >
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: designConstants.borderRadius,
        backgroundColor: colors.darkBlue,
        borderWidth: 1,
        borderColor: colors.textColor,
        width: '100%',
        height: designConstants.inputHeight,
        justifyContent: 'center',
        alignItems: 'center',
        top: 15,
    },
    text: {
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: colors.textColor,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "Raleway-SemiBold",
    },
});

export default SubmitButton;