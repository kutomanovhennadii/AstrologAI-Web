// Импорт необходимых модулей
import React from 'react';
import { View, Text } from 'react-native';

import appConfig from '../../static/json/appConfig.json';

//import { languageValidationSchema } from './validationSchema';
import useFocusManagement from '../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../hooks/useScreenOffsetControl';
import useBackHandler from '../../hooks/useBackHandler';

import CustomForm from '../common/CustomForm';
import { componentInstaller } from '../../utils/componentInstaller';

import { useUser } from '../../context/UserContext';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';

// Основной компонент формы профиля
const ContentSelector = ({ onSubmit, onBack }) => {

    //console.log("Render ContentSelector")

    const { user, setUser } = useUser();

    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig[user.language]["contentMetadataArray"];
    const commonText = appConfig[user.language]["common"];

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
        // additionalProps: {
        //     options: languageList,
        // }
    }));

    const onSubmitForm = (value) => {
        //console.log("value = ", value)
        setUser(prevUser => ({
            ...prevUser,
            generalContent: value.generalContent,
            businessContent: value.businessContent,
            relationContent: value.relationContent,
            healthContent: value.healthContent,
            aspectsContent: value.aspectsContent
        }));
        onSubmit();
    }

    useBackHandler(onBack);

    return (
        <View style={[inputStyles.size100, { flex: 1, top: 50 }]}>
            <Text style={[inputStyles.titleText, inputStyles.textAlignCenter]}>
                {commonText["Select prediction sections"]}
            </Text>
            {/* <View {...panResponder.panHandlers}
            > */}
            <CustomForm
                fieldsConfig={fieldsConfig}
                refs={refs}
                removeFocusFromAll={removeFocusFromAll}
                initialValues={{
                    generalContent: user.generalContent,
                    businessContent: user.businessContent,
                    relationContent: user.relationContent,
                    healthContent: user.healthContent,
                    aspectsContent: user.aspectsContent
                }}
                //validationSchema={languageValidationSchema}
                onSubmit={onSubmitForm}
                submitText={commonText["Select"]}
            />
            {/* </View> */}
        </View>

    );
};

export default ContentSelector;