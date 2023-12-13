// validationSchema.js
import * as Yup from 'yup';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';

export const makeValidationSchema = (userLanguage) => {
    const commonText = appConfig[userLanguage]["common"];

    return Yup.object({
        username: Yup.string()
            .min(5, commonText['User name must contain at least 6 characters'])
            .required(commonText['Required field']),
        password: Yup.string()
            .min(8, commonText['Password must contain at least 8 characters'])
            .required(commonText['Required field']),
    });
};

