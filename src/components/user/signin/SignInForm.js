// Импорт необходимых модулей
import React from 'react';
import { View } from 'react-native';

import appConfig from '../../../static/json/appConfig.json';

import { profileValidationSchema } from './validationSchema';
import useFocusManagement from '../../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../../hooks/useScreenOffsetControl';
//import { useCountryAndCity } from './useCountryAndCity';
//import { getComponentByName, getAdditionalPropsByName } from './getComponent'

import CustomForm from '../../common/CustomForm';
import { componentInstaller } from '../../../utils/componentInstaller';

// Основной компонент формы профиля
const SignInForm = ({ onSubmit }) => {

    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig["signInMetadataArray"];

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
        // <View {...panResponder.panHandlers}
        //     style={[{ marginTop: screenOffset }]}
        //     onLayout={(event) => {
        //         const height = event.nativeEvent.layout.height;
        //         updateContentHeight(height);
        //         //console.log("Height = ", height);
        //     }}
        // >
            <CustomForm
                fieldsConfig={fieldsConfig}
                refs={refs}
                removeFocusFromAll={removeFocusFromAll}
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={profileValidationSchema}
                onSubmit={onSubmit}
            />
        //</View>
    );
};

export default SignInForm;