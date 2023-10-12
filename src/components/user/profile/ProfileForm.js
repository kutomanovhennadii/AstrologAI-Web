import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DatePickerDialog from 'react-native-datepicker-dialog';
import DateInput from '../../common/DateInput'

import CustomInput from '../../common/CustomInput';
import SubmitButton from '../../common/SubmitButton';

const ProfileForm = ({ onSubmit }) => {
    const [datePickerVisible, setDatePickerVisible] = React.useState(false);
    const [date, setDate] = React.useState(new Date());


    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Required field'),
        password: Yup.string()
            .min(8, 'Password must contain at least 8 characters')
            .required('Required field'),
    });

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const onDatePicked = (date) => {
        setDate(date);
        setDatePickerVisible(false);
    };

    return (

        <Formik
            initialValues={{
                birthDate: date,
                email: '',
                password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { isValid }) => {
                console.log("onSubmit");
                console.log(values);

            }}
        >
            {({ handleSubmit }) => (
                <View>
                    <DateInput name="dateOfBirth" />

                    <CustomInput
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <CustomInput
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />
                    <SubmitButton
                        text="Continue"
                        onSubmit={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    input: {
        width: "100%",
        flexDirection: "column",
        overflow: "hidden",
        paddingTop: 5
    },
    defaultSlot: {
        fontSize: 16,
        letterSpacing: 1,
        lineHeight: 24,
        fontFamily: "Roboto",
        color: "#fafafa",
        textAlign: "left",
    },
});

export default ProfileForm;