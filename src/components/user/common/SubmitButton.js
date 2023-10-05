import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const SubmitButton = ({ text, onSubmit }) => {
    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
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
        borderRadius: 4,
        backgroundColor: '#1976d2',
        width: '90%',
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        top: 15,
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