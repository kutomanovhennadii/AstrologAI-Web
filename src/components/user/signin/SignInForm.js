// Импорт необходимых модулей
import React from 'react';
import { View } from 'react-native';

import { makeValidationSchema } from './validationSchema';
import useFocusManagement from '../../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../../hooks/useScreenOffsetControl';
import CustomForm from '../../common/CustomForm';
import { componentInstaller } from '../../../utils/componentInstaller';

import { useUser } from '../../../context/UserContext';
import appConfig from '../../../static/json/appConfig.json';

// Основной компонент формы профиля
const SignInForm = ({ onSubmit, initialValues }) => {

    //console.log("SignInForm initialValues = ", initialValues)
    const { user, setUser } = useUser();
    const commonText = appConfig[user.language]["common"];

    const submitText = user.registrated ? commonText["Select"] : commonText["Continue"];
    const validationSchema = makeValidationSchema(user.language);

    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig[user.language]["signInMetadataArray"];

    // Создание массива идентификаторов ссылок
    const refIdentifiers = fieldMetadataArray.map(item => item.name);

    // Создание объекта смещений для каждого поля
    const screenOffsets = Object.fromEntries(
        fieldMetadataArray.map(item => [item.name, item.screenOffset])
    );

    // Хук для управления смещением экрана
    const [screenOffset, setFieldOffset, panResponder, updateContentHeight] = useScreenOffsetControl();

    // Хуки для управления фокусом
    const [removeFocusFromAll, refs] = useFocusManagement(refIdentifiers, screenOffsets, setFieldOffset);

    // Создание конфигурации полей
    const fieldsConfig = fieldMetadataArray.map(metadata => ({
        ...metadata,
        component: componentInstaller(metadata.component),
    }));
    //console.log("fieldsConfig = ", fieldsConfig);

    return (
        <CustomForm
            fieldsConfig={fieldsConfig}
            refs={refs}
            removeFocusFromAll={removeFocusFromAll}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            submitText={submitText}
        />
    );
};

export default SignInForm;