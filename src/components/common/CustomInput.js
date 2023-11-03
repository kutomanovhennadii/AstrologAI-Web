import React, { useState, useEffect, useImperativeHandle } from 'react';
import { Text, TextInput, StyleSheet, View } from "react-native";
import { Field } from 'formik';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

const CustomInput = React.forwardRef((props, ref) => {
    const { label, validate, removeFocusFromAll, name, initialValue } = props;
    const [isFocused, setFocused] = useState(false);

    //console.log("Render CustomInput, initialValue =", props);

    // useEffect(() => {
    //     //console.log("CustomInput ref", ref.current);
    //     if (ref.current && name) {
    //         ref.current.myUniqueId = name;
    //     }
    // }, [name]);

    useImperativeHandle(ref, () => ({
        removeFocus: () => {
            setFocused(false);
        },
        isFocused: () => {
            return isFocused;
        }
    }));

    return (
        <Field name={props.name} validate={validate}>
            {({ field, form }) => {
                return (
                    <View style={inputStyles.container}>
                        <Text style={inputStyles.text}>{label}</Text>
                        <TextInput
                            ref={ref}
                            style={[inputStyles.text, inputStyles.border, isFocused ? inputStyles.focused : null]}
                            placeholder={props.placeholder}
                            placeholderTextColor={colors.placeholderTextColor}
                            name={field.name}
                            value={field.value}
                            onChangeText={form.handleChange(field.name)}
                            onBlur={() => {
                                //console.log("CustomInput on blur")
                                setFocused(false);
                            }}
                            onFocus={() => {
                                if (ref.current && name) {
                                    ref.current.myUniqueId = name;
                                }
                                removeFocusFromAll(ref); 
                                setFocused(true);
                            }}
                            secureTextEntry={props.type === 'password'}
                        />
                        {form.touched[field.name] && form.errors[field.name] && (
                            <Text style={inputStyles.errorText}>{form.errors[field.name]}</Text>
                        )}
                    </View>
                )
            }}
        </Field>
    );
});

const styles = StyleSheet.create({
    
});

export default CustomInput;