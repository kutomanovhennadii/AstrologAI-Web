// validationSchema.js
import * as Yup from 'yup';

export const languageValidationSchema = Yup.object({
    language: Yup.string()
        .required('Required field language'),
});