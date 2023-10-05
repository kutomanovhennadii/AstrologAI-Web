import React, { useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Field, ErrorMessage, useField } from 'formik';

import PromptWithActionLink from '../user/common/PromptWithActionLink';

const CheckboxLabelLink = ({ name, promt, buttonText, onLinkPress, isChecked = false }) => {
    const [field, meta, helpers] = useField(name);

    useEffect(() => {
        helpers.setValue(isChecked);
    }, [isChecked, helpers]);

    console.log(`Field value for ${name}:`, field.value);
    console.log(`Field error for ${name}:`, meta.error);

    const toggleCheckbox = () => {
        helpers.setValue(!field.value);
        console.log("toggleCheckbox");
    };

    return (
        <>
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
            <View>
                {meta.touched && meta.error && (
                    <Text style={styles.errorText}>{meta.error}</Text>
                )}
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        top: 12,
        
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
    errorText: {
        fontSize: 12,
        color: "red",
        textAlign: "left",
        marginTop: 5,
    },

});

export default CheckboxLabelLink;