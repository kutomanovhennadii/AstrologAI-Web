// Импорт необходимых модулей
import React from 'react';
import { View } from 'react-native';

import appConfig from '../../static/json/appConfig.json';

import { makeValidationSchema } from './validationSchema';
import useFocusManagement from '../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../hooks/useScreenOffsetControl';
import { getAdditionalPropsByName } from './getAdditionalPropsByName';

import CustomForm from '../common/CustomForm';
import { componentInstaller } from '../../utils/componentInstaller';
import { useUser } from '../../context/UserContext';

// Основной компонент формы профиля
const SignUpForm = ({ onSubmit, goToTerms, initialValues, termsAccepted = false }) => {

    const { user, setUser } = useUser();

    const commonText = appConfig[user.language]["common"];
    const submitText = user.registrated ? commonText["Select"] : commonText["Continue"];

    const validationSchema = makeValidationSchema(user.language);

    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig[user.language]["signUpMetadataArray"];

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
        additionalProps: getAdditionalPropsByName(metadata.name, termsAccepted, goToTerms)
    }));
    //console.log("fieldsConfig = ", fieldsConfig);

    return (
        <View
            style={{ overflow: 'hidden', height: 520 }} // Добавьте этот стиль
        >
            <View {...panResponder.panHandlers}
                style={[{ top: screenOffset }]}
                onLayout={(event) => {
                    const height = event.nativeEvent.layout.height;
                    updateContentHeight(height);
                    //console.log("screenOffset = ", screenOffset);
                }}
            >
                <CustomForm
                    fieldsConfig={fieldsConfig}
                    refs={refs}
                    removeFocusFromAll={removeFocusFromAll}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    submitText={submitText}
                />
            </View>
        </View>
    );
};

export default SignUpForm;