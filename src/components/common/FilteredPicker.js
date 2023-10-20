import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Field } from 'formik';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

const FilteredPicker = forwardRef((props, ref) => {
    // console.log("Render FilteredPicker, field = ", field);

    const { label, options, removeFocusFromAll, name, validate, onSelect, form, placeholder } = props;
    const [isFocused, setFocused] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState('');

    //console.log("Render FilteredPicker, form = ", form.errors);

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
                                    //console.log("FilteredPicker onFocus", ref);

                                    if (ref.current && name) {
                                        ref.current.myUniqueId = name;
                                    }
                                    //console.log("onFocus ", ref.current.myUniqueId);
                                    removeFocusFromAll(ref);
                                    setFocused(true);
                                }}
                                placeholder={placeholder}
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
                                        removeFocusFromAll(ref);
                                        //setFocused(false);
                                        setInputValue(item.label);
                                        onSelect(item.label);
                                    }}

                                >
                                    <Text style={inputStyles.text}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}

                    {
                        (() => {
                            //console.log("Render FilteredPicker, field = ", field);
                            if (form.touched[field.name] && form.errors[field.name]) {
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