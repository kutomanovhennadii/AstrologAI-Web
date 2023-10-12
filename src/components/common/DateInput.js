import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Field } from 'formik';

const DateInput = React.forwardRef(({ label, field, form, removeFocusFromAll, name}, ref) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(field.value || '');
    const [isFocused, setFocused] = useState(false);  // Добавлено новое состояние

    console.log("Render DateInput")

    const handleChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setSelectedDate(selectedDate);
            form.setFieldValue(field.name, selectedDate);
            form.setFieldTouched(field.name, true);
        }
    };

    useImperativeHandle(ref, () => ({
        removeFocus: () => {
            setFocused(false);
        },
        isFocused: () => {
            return isFocused;
        }
    }));

    useEffect(() => {
        if (ref.current && name) {
            ref.current.myUniqueId = name;
            console.log(`myUniqueId for ${name} set successfully`);
        }
    }, [name]);

    const toggleDatePicker = () => {
        removeFocusFromAll(ref);
        setFocused(true);
        setShowDatePicker(!showDatePicker);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TouchableOpacity
                ref={ref}
                onPress={toggleDatePicker}
                onBlur={() => {
                    setFocused(false);
                    form.handleBlur(field.name);
                }}
                // onFocus={() => {
                //     removeFocusFromAll(ref);
                //     setFocused(true);
                //     ref.current.focus();
                // }}
            >
                <View style={[styles.datePickerBox, isFocused ? styles.focused : null]}>
                    <View style={styles.dateTextBox}>
                        <Text style={styles.dateText}>
                            {selectedDate ? selectedDate.toDateString() : 'Select Date'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleChange}
                    maximumDate={new Date()}
                    onBlur={() => {
                        setFocused(false);
                        form.handleBlur(field.name);
                    }}
                />
            )}
            {form.touched[field.name] && form.errors[field.name] ? (
                <Text style={styles.errorText}>{form.errors[field.name]}</Text>
            ) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingTop: 5,
    },
    datePickerBox: {
        alignSelf: 'stretch',
        borderRadius: 4,
        borderColor: '#fafafa',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 0,
        height: 36,
    },
    text: {
        color: 'white',
        fontSize: 16,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        textAlign: 'left',
    },
    dateTextBox: {
        flex: 1,
        justifyContent: 'center', // Центрирование по вертикали
    },
    dateText: {
        color: 'white',
        fontSize: 16,
        letterSpacing: 1,
        fontFamily: 'Roboto',
        textAlign: 'left',
    },
    errorText: {
        color: 'red',
    },
    focused: {
        borderColor: 'blue',
    },
});

export default DateInput;