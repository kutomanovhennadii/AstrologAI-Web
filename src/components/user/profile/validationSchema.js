// validationSchema.js
import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
    gender: Yup.string()
        .required('Required field gender'),
    birthDate: Yup.date()
        .test('is-different', 'Date should be different from the default', function (value) {
            const defaultDate = new Date();
            return (
                value.toDateString() !== defaultDate.toDateString()
            );
        })
        .required('Required field'),
    birthTime: Yup.string()
        .required('Required field birtTime'),
    birthCountry: Yup.string()
        .required('Required field country'),
    birthCity: Yup.string()
        .required('Required field city'),
    biography: Yup.string()
});