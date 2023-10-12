import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import DateInput from '../../common/DateInput'

import CustomInput from '../../common/CustomInput';
import SubmitButton from '../../common/SubmitButton';

const ProfileForm = ({ onSubmit }) => {
    const [date, setDate] = React.useState(new Date());

    const emailRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const dateInputRef = React.useRef(null);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Required field'),
        password: Yup.string()
            .min(8, 'Password must contain at least 8 characters')
            .required('Required field'),
    });

    const removeFocusFromAll = (exceptRef) => {
        console.log("exceptRef = ", exceptRef.current.myUniqueId);


        if ("email" !== exceptRef.current.myUniqueId) {
            console.log("Blurring email input");
            emailRef.current.blur();
        }
        if ("password" !== exceptRef.current.myUniqueId) {
            console.log("Blurring password input");
            passwordRef.current.blur();
        }
        if ("birthDate" !== exceptRef.current.myUniqueId) {
            console.log("Removing focus from date input");
            dateInputRef.current.removeFocus();
        }
        console.log('removeFocusFromAll called');
    };
    return (
        <View style={styles.container}>
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
                    <Field name="birthDate">
                        {({ field, form }) => (
                            <DateInput
                                name="birthDate"
                                label="Date of Birth"
                                field={field}
                                form={form}
                                ref={dateInputRef}
                                removeFocusFromAll={removeFocusFromAll}
                            />
                        )}
                    </Field>
                    <CustomInput
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        ref={emailRef}
                        removeFocusFromAll={removeFocusFromAll}
                    />
                    <CustomInput
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        ref={passwordRef}
                        removeFocusFromAll={removeFocusFromAll}
                    />
                    <SubmitButton
                        text="Continue"
                        onSubmit={handleSubmit} />
                </View>
            )}
            </Formik>
        </View>  
    );
};

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        // borderColor: "red" 
    },
});

export default ProfileForm;