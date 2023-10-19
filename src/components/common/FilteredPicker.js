import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Field } from 'formik';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

const FilteredPicker = forwardRef((props, ref) => {
    const { label, options, removeFocusFromAll, name, validate, onSelectOption } = props;
    const [isFocused, setFocused] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState('');



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
                                    if (ref.current && name) {
                                        ref.current.myUniqueId = name;
                                    }
                                    console.log("onFocus ", ref.current.myUniqueId);
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
                            nestedScrollEnabled={true}
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
                    
                    {
                        (() => {
                            // console.log('Field name:', field.name);
                            // console.log('Form touched:', form.touched);
                            // console.log('Form errors:', form.errors);
                            if (form.touched[field.name] && form.errors[field.name]) {
                                console.log('Error found:', form.errors[field.name]);
                                return <Text style={inputStyles.errorText}>{form.errors[field.name]}</Text>;
                            }
                            return null;
                        })()
                    }
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