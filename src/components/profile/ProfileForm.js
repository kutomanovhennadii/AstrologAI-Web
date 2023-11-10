// Импорт необходимых модулей
import React from 'react';
import { View } from 'react-native';

import appConfig from '../../static/json/appConfig.json';

import { profileValidationSchema } from './validationSchema';
import useFocusManagement from '../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../hooks/useScreenOffsetControl';
import { useCountryAndCity } from './useCountryAndCity';
import { getComponentByName, getAdditionalPropsByName } from './getComponent'

import CustomForm from '../common/CustomForm';
import { componentInstaller } from '../../utils/componentInstaller';
import { sendToServer } from '../../services/sendToServer'

import { useUser } from '../../context/UserContext';

// Основной компонент формы профиля
const ProfileForm = ({ onSubmit }) => {
    const { user, setUser } = useUser();

    const commonText = appConfig[user.language]["common"];

    const onSubmitForm = (profileData) => {
        setUser(prevUser => ({
            ...prevUser,
            gender: profileData.gender,
            birthDate: profileData.birthDate,
            birthTime: profileData.birthTime,
            birthCountry: profileData.birthCountry,
            birthCity: profileData.birthCity,
            biography: profileData.biography,
        }));

        sendToServer('profile', profileData)
            .then(response => {
                console.log("Response from server", response);
            })
            .catch(error => {
                console.error("Error sending astrobot to server: ", error)
            });

        onSubmit();
    }
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

    return (
        <View {...panResponder.panHandlers}
            style={[{ marginTop: screenOffset }]}
            onLayout={(event) => {
                const height = event.nativeEvent.layout.height;
                updateContentHeight(height);
                //console.log("Height = ", height);
            }}
        >
            <CustomForm
                fieldsConfig={fieldsConfig}
                refs={refs}
                removeFocusFromAll={removeFocusFromAll}
                initialValues={{
                    gender: user.gender,
                    birthDate: user.birthDate,
                    birthTime: user.birthTime,
                    birthCountry: user.birthCountry,
                    birthCity: user.birthCity,
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