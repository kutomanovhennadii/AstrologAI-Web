// Импорт необходимых модулей
import React from 'react';
import { View } from 'react-native';
import { Formik, Field } from 'formik';

import appConfig from '../../../static/json/appConfig.json';
import SubmitButton from '../../common/SubmitButton';
import { profileValidationSchema } from './validationSchema';

import useFocusManagement from '../../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../../hooks/useScreenOffsetControl';
import { useCountryAndCity } from './useCountryAndCity';
import { getComponentByName, getAdditionalPropsByName } from './getComponent'

// Основной компонент формы профиля
const ProfileForm = ({ onSubmit }) => {
    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig.profileMetadataArray;

    // Хук для управления смещением экрана
    const [screenOffset, setFieldOffset, panResponder, updateContentHeight] = useScreenOffsetControl();

    // Создание массива идентификаторов ссылок
    const refIdentifiers = fieldMetadataArray.map(item => item.name);
    // Создание объекта смещений для каждого поля
    const screenOffsets = Object.fromEntries(
        fieldMetadataArray.map(item => [item.name, item.screenOffset])
    );

    // Хуки для управления фокусом и выбором страны и города
    const [removeFocusFromAll, refs] = useFocusManagement(refIdentifiers, screenOffsets, setFieldOffset);
    const [countryList, cityList, onSelectCountry, onSelectCity] = useCountryAndCity(refs);

    // Создание конфигурации полей
    const fieldsConfig = fieldMetadataArray.map(metadata => ({
        ...metadata,
        component: getComponentByName(metadata.name),
        additionalProps: getAdditionalPropsByName(metadata.name, countryList, cityList, onSelectCountry, onSelectCity)
    }));

    return (
        <View {...panResponder.panHandlers}
            style={[{ marginTop: screenOffset }]}
            onLayout={(event) => {
                const height = event.nativeEvent.layout.height;
                updateContentHeight(height);
                //console.log("Height = ", height);
            }}
        >
            <Formik
                initialValues={{
                    gender: '',
                    birthDate: '',
                    birthTime: "",
                    birthCountry: "",
                    birthCity: "",
                    biography: '',
                }}
                validationSchema={profileValidationSchema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({ handleSubmit }) => (
                    <View>
                        {/* Отображение каждого поля на основе его конфигурации */}
                        {fieldsConfig.map((fieldConfig, index) => (
                            <Field key={index} name={fieldConfig.name}>
                                {({ field, form }) => (
                                    React.createElement(
                                        fieldConfig.component,
                                        {
                                            name: fieldConfig.name,
                                            label: fieldConfig.label,
                                            field: field,
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
                                )}
                            </Field>
                        ))}
                        {/* Кнопка для отправки формы */}
                        <SubmitButton
                            text="Continue"
                            onSubmit={() => {
                                handleSubmit();
                            }}
                        />
                    </View>
                )}
            </Formik>
        </View >
    );
};

export default ProfileForm;