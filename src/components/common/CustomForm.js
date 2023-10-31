import React, { useEffect } from 'react';
import { View } from 'react-native';
import SubmitButton from './SubmitButton';
import { Formik, Field } from 'formik';

const CustomForm = ({
    fieldsConfig,
    refs,
    removeFocusFromAll,
    initialValues,
    validationSchema,
    onSubmit,
    submitText
}) => {

    if (!submitText)
        submitText = "CONTINUE";

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit }) => {
                //console.log('Внутри блока Formik, перед View');

                return (
                    <View>
                        {fieldsConfig.map((fieldConfig, index) => {
                            //console.log('Создание элемента для:', fieldConfig.name, 'с компонентом:', fieldConfig.component);
                            if (!fieldConfig.component) {
                                console.error(`Компонент для ${fieldConfig.name} не определен или равен null`);
                            }

                            return (
                                <Field key={index} name={fieldConfig.name}>
                                    {({ field, form }) => {
                                        
                                        //console.log("fieldConfig.component:", typeof fieldConfig.component);
                                        return React.createElement(
                                            fieldConfig.component,
                                            {
                                                name: fieldConfig.name,
                                                label: fieldConfig.label,
                                                field: field,
                                                type: fieldConfig.type,
                                                initialValue: field.value,
                                                form: form,
                                                ref: refs[fieldConfig.name],
                                                removeFocusFromAll: removeFocusFromAll,
                                                placeholder: fieldConfig.placeholder,
                                                ...fieldConfig.additionalProps,
                                                onSelect: (value) => {
                                                    if (fieldConfig.additionalProps && fieldConfig.additionalProps.onSelect) {
                                                        fieldConfig.additionalProps.onSelect(value, form);
                                                    } else {
                                                        form.setFieldValue(fieldConfig.name, value);
                                                    }
                                                }
                                            }
                                        )
                                    }}
                                </Field>
                            );
                        })}
                        <SubmitButton
                            text={submitText}
                            onSubmit={handleSubmit}
                        />
                    </View>
                );
            }}
        </Formik>
    );
};

//console.log('DynamicForm файл загружен и компонент определен.');

export default CustomForm;