import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Field } from 'formik';

const TimeInput = React.forwardRef(({ label, field, form, removeFocusFromAll, name }, ref) => {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(field.value || '');
    const [isFocused, setFocused] = useState(false);

    console.log("Render TimeInput");

    const handleChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            setSelectedTime(selectedTime);
            form.setFieldValue(field.name, selectedTime);
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
        }
    }, [name]);

    const toggleTimePicker = () => {
        removeFocusFromAll(ref);
        setFocused(true);
        setShowTimePicker(!showTimePicker);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            <TouchableOpacity
                ref={ref}
                onPress={toggleTimePicker}
                onBlur={() => {
                    setFocused(false);
                    form.handleBlur(field.name);
                }}
            >
                <View style={[styles.datePickerBox, isFocused ? styles.focused : null]}>
                    <View style={styles.dateTextBox}>
                        <Text style={styles.dateText}>
                            {selectedTime ? selectedTime.toTimeString().split(' ')[0] : 'Select Time'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            {showTimePicker && (
                <TouchableWithoutFeedback onPressOut={() => setShowDatePicker(false)}>
                    <View>
                        <DateTimePicker
                            value={selectedTime || new Date()}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={handleChange}
                            onBlur={() => {
                                setFocused(false);
                                form.handleBlur(field.name);
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>
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
        width: '48%',
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


export default TimeInput;