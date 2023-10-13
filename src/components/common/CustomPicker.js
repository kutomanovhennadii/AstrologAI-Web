import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Field } from 'formik';
import { Picker } from '@react-native-picker/picker';

const CustomPicker = React.forwardRef((props, ref) => {
    console.log("Render CustomPicker")

    const { label, options, removeFocusFromAll, name, validate, onSelectOption } = props;
    const [isFocused, setFocused] = useState(false);

    useEffect(() => {
        if (ref.current && name) {
            ref.current.myUniqueId = name;
        }
    }, [name]);

    useImperativeHandle(ref, () => ({
        removeFocus: () => {
            setFocused(false);
        },
        isFocused: () => {
            return isFocused;
        }
    }));

    return (
        <Field name={name} validate={validate}>
            {({ field, form }) => (
                <View style={styles.input}>
                    <Text style={styles.defaultSlot}>{label}</Text>
                    <View style={[styles.pickerContainer, isFocused ? styles.focused : null]}>
                        <Picker
                            ref={ref}
                            style={styles.picker}
                            selectedValue={field.value}
                            onValueChange={(itemValue) => {
                                form.setFieldValue(field.name, itemValue);
                                form.setFieldTouched(field.name, true);
                                if (onSelectOption) {
                                    onSelectOption(itemValue);
                                }
                            }}
                            onBlur={() => {
                                //setFocused(false);
                            }}
                            onFocus={() => {
                                removeFocusFromAll(ref);
                                setFocused(true);
                            }}
                        >
                            {/* {placeholder && <Picker.Item label={placeholder} value={null} />} */}
                            {options.map((item, index) => (
                                <Picker.Item key={index} label={item.label} value={item.value} />
                            ))}
                        </Picker>
                    </View>

                    {form.touched[field.name] && form.errors[field.name] && (
                        <Text style={styles.errorText}>{form.errors[field.name]}</Text>
                    )}
                </View>
            )}
        </Field>
    );
});

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    input: {
        marginTop: 10,
    },
    defaultSlot: {
        color: 'white',
        fontSize: 16,
    },
    pickerContainer: {
        height: 32,
        width: '100%',
        alignSelf: "stretch",
        borderRadius: 4,
        borderColor: "#fafafa",
        borderWidth: 1,
        justifyContent: 'center',
    },
    picker: {
        fontSize: 16,
        color: "#fafafa",
        fontFamily: "Roboto",
        letterSpacing: 1,
    },
    focused: {
        borderColor: 'blue',
    },
    errorText: {
        color: 'red',
    },
});

export default CustomPicker;