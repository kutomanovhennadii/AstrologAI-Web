// validationSchema.js
import * as Yup from 'yup';

export const profileValidationSchema = Yup.object({
    gender: Yup.string()
        .required('Required field gender'),
    birth_date: Yup.date()
        .test('is-different', 'Date should be different from the default', function (value) {
            const defaultDate = new Date();
            return (
                value.toDateString() !== defaultDate.toDateString()
            );
        })
        .required('Required field'),
    birth_time: Yup.string()
        .required('Required field birtTime'),
    birth_country: Yup.string()
        .required('Required field country'),
    birth_city: Yup.string()
        .required('Required field city'),
    //biography: Yup.string()
});