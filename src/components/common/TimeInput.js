import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

const TimeInput = React.forwardRef(({ label, field, form, removeFocusFromAll, name, placeholder }, ref) => {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date(`1970-01-01T${field.value || '00:00:00'}`));
    const [isFocused, setFocused] = useState(false);

    //console.log("Render TimeInput", field.name, form.errors);

    const handleChange = (event, selectedTime) => {
        setShowTimePicker(Platform.OS === 'ios');
        if (selectedTime) {
            setSelectedTime(selectedTime);
            form.setFieldValue(field.name, selectedTime.toTimeString().split(' ')[0]);
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
        <View style={[inputStyles.container, inputStyles.width100]}>
            <Text style={inputStyles.text}>{label}</Text>
            <TouchableOpacity
                ref={ref}
                onPress={toggleTimePicker}
                onBlur={() => {
                    setFocused(false);
                    form.handleBlur(field.name);
                }}
            >
                <View style={[inputStyles.border, isFocused ? inputStyles.focused : null]}>
                    <View style={styles.dateTextBox}>
                        <Text
                            style={[
                                inputStyles.text,
                                !selectedTime ? { color: colors.placeholderTextColor } : {}
                            ]}
                        >
                            {selectedTime instanceof Date ? selectedTime.toTimeString().split(' ')[0] : `${placeholder}`}
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
                <Text style={inputStyles.errorText}>{form.errors[field.name]}</Text>
            ) : null}
        </View>
    );
});

const styles = StyleSheet.create({
    dateTextBox: {
        flex: 1,
        justifyContent: 'center', // Центрирование по вертикали
    },
});


export default TimeInput;