import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Field } from 'formik';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

const FilteredPicker = forwardRef((props, ref) => {
    const { label, options, removeFocusFromAll, name, validate, onSelectOption, form } = props;
    const [isFocused, setFocused] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState('');

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
        },
        removeValue: () => {
            setInputValue("");
            form.setFieldValue(name, '');

         }
    }));

    useEffect(() => {
        setFilteredOptions(options);
    }, [options]);

    const filterOptions = (text) => {
        setInputValue(text);
        setFilteredOptions(options.filter(option =>
            option.label.toLowerCase().startsWith(text.toLowerCase())
        ));
    };

    return (
        <Field name={name} validate={validate}>
            {({ field, form }) => (

                <View style={inputStyles.container}>
                    <Text style={inputStyles.text}>{label}</Text>
                    <View style={[inputStyles.border, isFocused ? inputStyles.focused : null]}>
                        <View style={inputStyles.dateTextBox}>
                            <TextInput
                                style={inputStyles.text}
                                value={inputValue}
                                onChangeText={filterOptions}
                                onFocus={() => {
                                    removeFocusFromAll(ref);
                                    setFocused(true);
                                }}
                                placeholder="Enter text to search"
                                placeholderTextColor={colors.placeholderTextColor}
                            />
                        </View>

                    </View>
                    {isFocused && (
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            style={[inputStyles.border, styles.listContainer]}
                            data={filteredOptions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.listItem]}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        console.log("Selected ", item.value);
                                        form.setFieldValue(field.name, item.value);
                                        setFocused(false);
                                        setInputValue(item.label);
                                        onSelectOption(item.label);
                                    }}

                                >
                                    <Text style={inputStyles.text}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
                    {form.touched[field.name] && form.errors[field.name] && (
                        <Text style={inputStyles.errorText}>{form.errors[field.name]}</Text>
                    )}
                </View>
            )}
        </Field>
    );
});

const styles = StyleSheet.create({
    listContainer: {
        height: 120,
    },
    listItem: {
        paddingVertical: 3,
    },
});

export default FilteredPicker;