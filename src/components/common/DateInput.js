import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

const DateInput = React.forwardRef(({ label, field, form, removeFocusFromAll, name, placeholder }, ref) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(field.value || new Date()));
    const [isFocused, setFocused] = useState(false);  // Добавлено новое состояние

    //console.log("Render DateInput", field.name, form.errors)

    const handleChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setSelectedDate(selectedDate);
            form.setFieldValue(field.name, selectedDate.toISOString().split('T')[0]);
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

    const toggleDatePicker = () => {
        if (ref.current && name) {
            ref.current.myUniqueId = name;
        }
        //console.log("Set name ", ref.current.myUniqueId);
        removeFocusFromAll(ref);
        setFocused(true);
        setShowDatePicker(!showDatePicker);
    };

    return (
        <View style={[inputStyles.container, inputStyles.width100]}>
            <Text style={inputStyles.text}>{label}</Text>
            <TouchableOpacity
                ref={ref}
                onPress={toggleDatePicker}
                onBlur={() => {
                    setFocused(false);
                    form.handleBlur(field.name);
                }}
            >
                <View style={[inputStyles.border, isFocused ? inputStyles.focused : null]}>
                    <View style={inputStyles.dateTextBox}>
                        <Text
                            style={[
                                inputStyles.text,
                                !selectedDate ? { color: colors.placeholderTextColor } : {}
                            ]}
                        >
                            {selectedDate instanceof Date ? selectedDate.toISOString().split('T')[0] : `${placeholder}`}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            {showDatePicker && (
                <TouchableWithoutFeedback onPressOut={() => setShowDatePicker(false)}>
                    <View>
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

export default DateInput;