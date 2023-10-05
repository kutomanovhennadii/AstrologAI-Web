import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const SubmitButton = ({ text, onSubmit }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                //console.log('Button pressed');
                onSubmit();
            }}
        >
            <Text style={styles.text}>{ text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        backgroundColor: '#1976d2',
        width: '100%',
        height: 44,
        justifyContent: 'center',
        paddingHorizontal: 16,
        top: 15
    },
    text: {
        fontSize: 14,
        letterSpacing: 1,
        lineHeight: 36,
        textTransform: 'uppercase',
        fontWeight: '500',
        fontFamily: 'Roboto',
        color: '#fff',
        textAlign: 'center',
    },
});

export default SubmitButton;