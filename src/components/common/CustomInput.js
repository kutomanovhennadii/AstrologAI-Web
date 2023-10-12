import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View } from "react-native";
import { Field } from 'formik';

// const CustomInput = React.forwardRef(({ label, validate, removeFocusFromAll, name, ...props }, ref) => {
const CustomInput = React.forwardRef((props, ref) => {
    const { label, validate, removeFocusFromAll, name } = props;
    const [isFocused, setFocused] = useState(false);

    useEffect(() => {

        if (ref.current && name) {
            ref.current.myUniqueId = name;
            console.log(`myUniqueId for ${name} set successfully`);
        }
    }, [name]);

    return (
        <Field name={props.name} validate={validate}>
            {({ field, form }) => {


                return (
                    <View style={styles.input}>
                        <Text style={styles.defaultSlot}>{label}</Text>
                        <TextInput
                            ref={ref}
                            style={[styles.textInput, isFocused ? styles.focused : null]}
                            placeholder={props.placeholder}
                            placeholderTextColor="#fafafa"
                            name={field.name}
                            value={field.value}
                            onChangeText={form.handleChange(field.name)}
                            onBlur={() => {
                                console.log("CustomInput on blur")
                                setFocused(false);
                                //removeFocusFromAll(); 
                            }}
                            onFocus={() => {
                                removeFocusFromAll(ref); // Убираем фокус из других полей
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
});

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