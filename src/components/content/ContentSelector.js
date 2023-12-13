// Импорт необходимых модулей
import React, { useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

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
import { useSendUserInfo } from '../../hooks/useSendUserInfo';

// Основной компонент формы профиля
const ContentSelector = ({ onSubmit, onBack }) => {

    //console.log("Render ContentSelector")

    const { user, setUser } = useUser();
    const { sendUserInfo, loading } = useSendUserInfo();
    const [authError, setAuthError] = useState(null);

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

    const onSubmitForm = async (values) => {
        //console.log('LanguageForm onSubmitForm values:', values);
        const response = await sendUserInfo('user_data/', {
            generalContent: values.generalContent,
            businessContent: values.businessContent,
            relationContent: values.relationContent,
            healthContent: values.healthContent,
            aspectsContent: values.aspectsContent
        });
        //console.log('LanguageForm onSubmitForm response:', response);

        if (!response.success) {
            setAuthError(response.error);
        }
        else {
            onSubmit();
        }
    };

    useBackHandler(onBack);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

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

            {authError && <Text style={inputStyles.errorText}>{authError}</Text>}
            {/* </View> */}
        </View>

    );
};

export default ContentSelector;