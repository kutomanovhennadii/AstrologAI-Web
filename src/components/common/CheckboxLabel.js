import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useField } from 'formik';

const CheckboxLabel = ({ name, label }) => {
    const [field, , helpers] = useField(name);

    const toggleCheckbox = () => {
        helpers.setValue(!field.value);
    };

    return (
        <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
            <View style={styles.checkbox}>
                <Text style={styles.icon}>{field.value ? '✔️' : ''}</Text>
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20
    },
    checkbox: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    icon: {
        fontSize: 24,
    },
    label: {
        marginLeft: 8,
        fontSize: 20,
        fontFamily: "Roboto",
        color: "#fff",
    },
});

export default CheckboxLabel;