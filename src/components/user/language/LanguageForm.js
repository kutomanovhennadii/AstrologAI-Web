// Импорт необходимых модулей
import React from 'react';
import { View } from 'react-native';

import appConfig from '../../../static/json/appConfig.json';

import { languageValidationSchema } from './validationSchema';
import useFocusManagement from '../../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../../hooks/useScreenOffsetControl';

import CustomForm from '../../common/CustomForm';
import { componentInstaller } from '../../../utils/componentInstaller';

import { useUser } from '../../../context/UserContext';

import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';

// Основной компонент формы профиля
const LanguageForm = ({ onSubmit }) => {

    console.log("Render LanguageForm")

    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig["languageMetadataArray"];
    const languageList = appConfig["languageList"].map(item => ({
        "label": item.name ,
        "value": item.name 
    }));

    const { user, setUser } = useUser();
    console.log("user.language = ", user.language)


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
        //component: getComponentByName(metadata.name),
        component: componentInstaller(metadata.component),
        additionalProps: {
            options: languageList,
        }
    }));

    const onSubmitForm = (value) => {
        console.log("value = ", value)
        setUser(prevUser => ({
            ...prevUser,
            language: value.language
        }));
        onSubmit();
    }

    return (
        <View style={[inputStyles.size100, { flex: 1, top: 50 }]}>
            <View {...panResponder.panHandlers}
                style={[{ marginTop: screenOffset }]}
                onLayout={(event) => {
                    // const height = event.nativeEvent.layout.height;
                    // updateContentHeight(height);
                    //console.log("Height = ", height);
                }}
            >
                <CustomForm
                    fieldsConfig={fieldsConfig}
                    refs={refs}
                    removeFocusFromAll={removeFocusFromAll}
                    initialValues={{
                        language: user.language,
                    }}
                    validationSchema={languageValidationSchema}
                    onSubmit={onSubmitForm}
                    submitText = "Select"
                />
            </View>
        </View>

    );
};

export default LanguageForm;