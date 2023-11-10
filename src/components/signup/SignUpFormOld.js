import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomInput from '../common/CustomInput';
import SubmitButton from '../common/SubmitButton';
import CheckboxLabelLink from '../common/CheckboxLabelLink'

const SignUpFormOld = ({ onSubmit, goToTerms, termsAccepted = false }) => {
    const validationSchema = Yup.object({
        // userName: Yup.string()
        //     .min(5, 'User name must contain at least 5 characters')
        //     .required('Required field'),
        // email: Yup.string()
        //     .email('Invalid email')
        //     .required('Required field'),
        // password: Yup.string()
        //     .min(8, 'Password must contain at least 8 characters')
        //     .required('Required field'),
        // cofirmPassword: Yup.string()
        //     .min(8, 'Password must contain at least 8 characters')
        //     .required('Required field')
        //     .oneOf([Yup.ref('password')], 'Passwords must match'),
        // agreeToTerms: Yup.bool()
        //     .oneOf([true], 'You must accept the terms of using')
    });

    //console.log("Render SignUpForm")

    const handleAgreeToTermsPress = () => {

        //console.log('AgreeToTerms');
        goToTerms();
    };

    return (
        <Formik
            initialValues={{
                userName: '',
                email: '',
                password: '',
                cofirmPassword: '',
                agreeToTerms: termsAccepted
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { isValid }) => {
                //console.log("onSubmit");
                //console.log(values);
                validationSchema.isValid(values).then((isValid) => {
                    //console.log("isValid = ", isValid);
                    if (isValid) {
                        onSubmit();  // ваш метод для перенаправления
                    }
                    actions.setSubmitting(false);
                });
            }}
        >
            {({ handleSubmit }) => (
                <View>
                    <CustomInput
                        name="userName"
                        label="User name"
                        placeholder="Input your name"
                    />

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
                    <CustomInput
                        name="cofirmPassword"
                        label="Confirm password"
                        placeholder="Repeat your password"
                        type="password"
                    />
                    <CheckboxLabelLink
                        promt="  I accept "
                        buttonText="the terms of using"
                        name="agreeToTerms"
                        isChecked={termsAccepted}
                        onLinkPress={goToTerms}
                    />
                    <SubmitButton
                        text="Sign In"
                        onSubmit={handleSubmit} />
                </View>
            )}
        </Formik>
    );
};

export default SignUpFormOld;