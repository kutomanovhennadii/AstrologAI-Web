// validationSchema.js
import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email')
        .required('Required field'),
    password: Yup.string()
        .min(8, 'Password must contain at least 8 characters')
        .required('Required field'),
});