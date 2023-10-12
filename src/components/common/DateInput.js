import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormikContext, useField } from 'formik';
import DatePicker from 'react-native-date-picker';

const DateInput = ({ name }) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    return (
        <View style={styles.container}>
            <Text>Date of Birth</Text>
            <View style={styles.datePickerBox}>
                <DatePicker
                    date={field.value ? new Date(field.value) : new Date()}
                    onDateChange={(date) => setFieldValue(name, date)}
                    mode="date"
                />
            </View>
            {meta.touched && meta.error ? (
                <Text style={styles.errorText}>{meta.error}</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    datePickerBox: {
        marginTop: 9,
        borderColor: '#ABABAB',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
    },
});

export default DateInput;