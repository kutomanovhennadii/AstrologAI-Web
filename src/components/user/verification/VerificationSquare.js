import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

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
        backgroundColor: '#d9d9d9',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 4,
    },
    textInput: {
        fontSize: 30,
        width: '100%',
        textAlign: 'center',
    }
});

export default VerificationSquare;






