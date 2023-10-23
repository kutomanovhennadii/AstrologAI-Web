import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomInput from '../../common/CustomInput';
import SubmitButton from '../../common/SubmitButton';

const SignInFormOld = ({ onSubmit }) => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email')
            .required('Required field'),
        password: Yup.string()
            .min(8, 'Password must contain at least 8 characters')
            .required('Required field'),
    });



    return (
        <Formik
            initialValues={{
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

export default SignInFormOld;