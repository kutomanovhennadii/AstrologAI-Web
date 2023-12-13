// Импорт необходимых модулей
import React, { useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

import appConfig from '../../static/json/appConfig.json';

import { languageValidationSchema } from './validationSchema';
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
const LanguageForm = ({ onSubmit, onBack }) => {
    const { user, setUser } = useUser();
    const { sendUserInfo, loading } = useSendUserInfo();
    const [authError, setAuthError] = useState(null);

    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig[user.language]["languageMetadataArray"];
    const commonText = appConfig[user.language]["common"];

    //console.log("LanguageForm fieldMetadataArray ", fieldMetadataArray);

    const languageList = appConfig["languageList"].map(item => ({
        "label": item.name,
        "value": item.name
    }));

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

    const onSubmitForm = async (values) => {
        console.log('LanguageForm onSubmitForm values:', values);
        const response = await sendUserInfo('user_data/', { language: values.language });
        console.log('LanguageForm onSubmitForm response:', response);

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
                    submitText={commonText["Select"]}
                />

                {authError && <Text style={[inputStyles.errorText, styles.padding]}>{authError}</Text>}
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    padding: {
        paddingTop: 20
    },
});

export default LanguageForm;