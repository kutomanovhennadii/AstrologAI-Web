import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { Field } from 'formik';

const FilteredPicker = forwardRef((props, ref) => {
    const { label, options, removeFocusFromAll, name, validate, onSelectOption } = props;
    const [isFocused, setFocused] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [inputValue, setInputValue] = useState('');
    const [formInstance, setFormInstance] = useState(null);

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
            //form.setFieldValue(field.name, item.value);

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

                <View style={styles.input}>
                    <Text style={styles.defaultSlot}>{label}</Text>
                    <View style={[styles.pickerContainer, isFocused ? styles.focused : null]}>
                        <TextInput
                            style={styles.picker}
                            value={inputValue}
                            onChangeText={filterOptions}
                            onFocus={() => {
                                removeFocusFromAll(ref);
                                setFocused(true);
                            }}
                            placeholder="Enter text to search"
                            placeholderTextColor="#888"
                        />
                    </View>
                    {isFocused && (
                        <FlatList
                            keyboardShouldPersistTaps="always"
                            style={styles.listContainer}
                            data={filteredOptions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.listItem}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        console.log("Selected ", item.value);
                                        form.setFieldValue(field.name, item.value);
                                        setFocused(false);
                                        setInputValue(item.label);
                                        onSelectOption(item.label);
                                    }}

                                >
                                    <Text style={styles.listItemText}>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    )}
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
    listContainer: {
        //position: 'absolute',
        zIndex: 999,
        maxHeight: 120,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        //overflow: 'hidden',
        right: 0,
        left: 0,
    },
    listItem: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        // borderWidth: 1,
        // borderColor: 'red',
    },
    listItemText: {
        color: 'white',
        fontSize: 16,
    },
});

export default FilteredPicker;