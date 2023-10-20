import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View } from "react-native";
import { Field } from 'formik';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import designConstants from '../../styles/designConstants';

const MultilineInput = React.forwardRef((props, ref) => {
    const { label, validate, removeFocusFromAll, name } = props;
    const [isFocused, setFocused] = useState(false);
    //console.log("CustomTextarea ref", ref.current.myUniqueId);

    // useEffect(() => {
    //     // console.log("CustomTextarea ref", name);
    //     if (ref.current && name) {
    //         ref.current.myUniqueId = name;
    //     }
    //     // console.log("CustomTextarea ref", ref.current.myUniqueId);
    // }, [name]);

    return (

            <Field name={props.name} validate={validate}>
                {({ field, form }) => {
                    return (
                        <View style={inputStyles.container}>
                            <Text style={inputStyles.text}>{label}</Text>
                            <TextInput
                                ref={ref}
                                style={[
                                    inputStyles.text,
                                    inputStyles.border,
                                    isFocused ? inputStyles.focused : null, styles.TextInput  // Предполагая, что высота одной строки составляет 20px
                                ]}
                                placeholder={props.placeholder}
                                placeholderTextColor={colors.placeholderTextColor}
                                name={field.name}
                                value={field.value}
                                onChangeText={form.handleChange(field.name)}
                                onBlur={() => {
                                    //console.log("CustomTextarea on blur")
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
                                multiline={true}
                                numberOfLines={4} // Например, для 4 строк. Вы можете изменить это значение по своему усмотрению.
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
    TextInput: {
        height: designConstants.inputHeight * 2,
        textAlignVertical: 'top',
        paddingVertical: 5,
    }
});

export default MultilineInput;