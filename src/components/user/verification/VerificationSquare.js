import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import inputStyles from '../../../styles/InputStyles';
import designConstants from '../../../styles/designConstants';
import colors from '../../../styles/colors';

const VerificationSquare = ({ field, form, nextInput, innerRef }) => {
    const handleChange = (text) => {
        if (text.length === 1) {
            console.log("nextInput = ", nextInput)
            form.setFieldValue(field.name, text);
            nextInput && nextInput.current && nextInput.current.focus();
        } else if (text.length === 0) {
            form.setFieldValue(field.name, '');
        }
    };

    return (
        <View style={styles.rectangleView}>
            <TextInput
                style={styles.textInput}
                ref={innerRef}
                maxLength={1}
                keyboardType="numeric"
                onChangeText={handleChange}
                value={field.value}
                selectionColor="#000000"
            />
        </View>
    );
};


const styles = StyleSheet.create({
    rectangleView: {
        backgroundColor: colors.textColor,
        height: designConstants.inputHeight,
        width: designConstants.inputHeight,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: designConstants.borderRadius,
    },
    textInput: {
        fontSize: 30,
        width: '100%',
        textAlign: 'center',
    }
});

export default VerificationSquare;






