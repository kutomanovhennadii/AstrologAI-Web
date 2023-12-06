// validationSchema.js
import * as Yup from 'yup';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';

export const makeValidationSchema = (userLanguage) => {
    const commonText = appConfig[userLanguage]["common"];

    return Yup.object({
        name: Yup.string()
            .min(5, commonText['User name must contain at least 5 characters'])
            .required(commonText['Required field']),
        email: Yup.string()
            .email(commonText['Invalid email'])
            .required(commonText['Required field']),
        password: Yup.string()
            .min(8, commonText['Password must contain at least 8 characters'])
            .required(commonText['Required field']),
        cofirmPassword: Yup.string()
            .min(8, commonText['Password must contain at least 8 characters'])
            .required(commonText['Required field'])
            .oneOf([Yup.ref('password')], commonText['Passwords must match']),
        agreeToTerms: Yup.bool()
            .oneOf([true], commonText['You must accept the terms of using']),
    });
};
