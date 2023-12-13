// Импорт необходимых модулей
import React, { useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

import appConfig from '../../static/json/appConfig.json';

import { profileValidationSchema } from './validationSchema';
import useFocusManagement from '../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../hooks/useScreenOffsetControl';
import { useCountryAndCity } from './useCountryAndCity';
import { getComponentByName, getAdditionalPropsByName } from './getComponent'

import CustomForm from '../common/CustomForm';
import { componentInstaller } from '../../utils/componentInstaller';
import { sendUserInfoToServer } from '../../services/sendUserInfoToServer'

import inputStyles from '../../styles/InputStyles';

import { useUser } from '../../context/UserContext';
import { useSendUserInfo } from '../../hooks/useSendUserInfo';
import getLocation from '../../services/getLocation';

// Основной компонент формы профиля
const ProfileForm = ({ onSubmit }) => {
    const { user, setUser } = useUser();
    const { sendUserInfo, loading } = useSendUserInfo();
    const [authError, setAuthError] = useState(null);

    const commonText = appConfig[user.language]["common"];

    const onSubmitForm = async (profileData) => {
        console.log('ProfileForm onSubmitForm values:', profileData);

        location = await getLocation();
        console.log('ProfileForm onSubmitForm location:', location);

        const response = await sendUserInfo('user_data/', {
            gender: profileData.gender,
            birth_date: profileData.birth_date,
            birth_time: profileData.birth_time,
            birth_country: profileData.birth_country,
            birth_city: profileData.birth_city,
            biography: profileData.biography,
            residence_longitude: location.longitude,
            residence_latitude: location.latitude,
            update_profile: true,
        });
        console.log('LanguageForm onSubmitForm response:', response);

        if (!response.success) {
            setAuthError(response.error);
        }
        else {
            onSubmit();
        }
    };

    const submitText = user.registrated ? commonText["Select"] : commonText["Continue"];

    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig[user.language]["profileMetadataArray"];

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

    // Хуки для выбора страны и города
    const [countryList, cityList, onSelectCountry, onSelectCity] = useCountryAndCity(refs);

    // Создание конфигурации полей
    const fieldsConfig = fieldMetadataArray.map(metadata => ({
        ...metadata,
        //component: getComponentByName(metadata.name),
        component: componentInstaller(metadata.component),
        additionalProps: getAdditionalPropsByName(metadata.name, countryList, cityList, onSelectCountry, onSelectCity)
    }));

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View {...panResponder.panHandlers}
            style={[{ marginTop: screenOffset }]}
            onLayout={(event) => {
                const height = event.nativeEvent.layout.height;
                updateContentHeight(height);
                //console.log("Height = ", height);
            }}
        >
            {authError && <Text style={inputStyles.errorText}>{authError}</Text>}

            <CustomForm
                fieldsConfig={fieldsConfig}
                refs={refs}
                removeFocusFromAll={removeFocusFromAll}
                initialValues={{
                    gender: user.gender,
                    birth_date: user.birth_date,
                    birth_time: user.birth_time,
                    birth_country: user.birth_country,
                    birth_city: user.birth_city,
                    biography: user.biography,
                }}
                validationSchema={profileValidationSchema}
                onSubmit={onSubmitForm}
                submitText={submitText}
            />
        </View>
    );
};

export default ProfileForm;