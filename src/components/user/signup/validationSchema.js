// validationSchema.js
import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
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