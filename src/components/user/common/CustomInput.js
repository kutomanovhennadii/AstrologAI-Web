import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View } from "react-native";
import { Field } from 'formik';

const CustomInput = ({ label, validate, ...props }) => {
    //console.log("Props name is: ", props.name);

    const [isFocused, setFocused] = useState(false);

    return (
        <Field name={props.name} validate={validate}>
            {({ field, form }) => {
                //console.log("Field object:", JSON.stringify(field, null, 2));
                return (
                    <View style={styles.input}>
                        <Text style={styles.defaultSlot}>{label}</Text>
                        <TextInput
                            style={[styles.textInput, isFocused ? styles.focused : null]}
                            placeholder={props.placeholder}
                            placeholderTextColor="#fafafa"
                            name={field.name}
                            value={field.value}
                            onChangeText={form.handleChange(field.name)}
                            onBlur={() => {
                                setFocused(false);
                                form.handleBlur(field.name);
                            }}
                            onFocus={() => {
                                //console.log('Input focused');
                                setFocused(true);
                            }}
                            secureTextEntry={props.type === 'password'}
                        />
                        {form.touched[field.name] && form.errors[field.name] && (
                            <Text style={styles.errorText}>{form.errors[field.name]}</Text>
                        )}
                    </View>
                )
            }}
        </Field>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        flexDirection: "column",
        overflow: "hidden",
        paddingTop: 5
    },
    defaultSlot: {
        fontSize: 16,
        letterSpacing: 1,
        lineHeight: 24,
        fontFamily: "Roboto",
        color: "#fafafa",
        textAlign: "left",
    },
    textInput: {
        alignSelf: "stretch",
        borderRadius: 4,
        borderColor: "#fafafa",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 0,
        fontSize: 16,
        letterSpacing: 1,
        //lineHeight: 24,
        fontFamily: "Roboto",
        color: "#fafafa",
        //height: 26,
    },
    errorText: {
        fontSize: 12,
        color: "red",
        textAlign: "left",
        marginTop: 5,
    },
    focused: {
        borderColor: 'blue',
    },
});

export default CustomInput;