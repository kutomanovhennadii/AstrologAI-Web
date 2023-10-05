import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useField } from 'formik';

import PromptWithActionLink from '../common/PromptWithActionLink';

const CheckboxLabel = ({ name, promt, buttonText, onLinkPress }) => {
    const [field, , helpers] = useField(name);

    const toggleCheckbox = () => {
        helpers.setValue(!field.value);
        console.log("toggleCheckbox");
    };

    return (
        <TouchableOpacity onPress={toggleCheckbox} style={styles.container}>
            <View style={styles.checkbox}>
                <Text style={styles.icon}>{field.value ? '✔️' : ''}</Text>
            </View>
            <View style={styles.promptContainer}>
                <PromptWithActionLink
                    promt={promt}  
                    buttonText={buttonText} 
                    onLinkPress={onLinkPress} 
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',  
        top: 12
    },
    checkbox: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    promptContainer: {
        justifyContent: 'center',
    },
    icon: {
        fontSize: 24,
    },
    text: {
        marginLeft: 8,
        color: '#1976d2',
    },

});

export default CheckboxLabel;