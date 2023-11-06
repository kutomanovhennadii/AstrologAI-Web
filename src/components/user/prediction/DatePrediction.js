// Импорт необходимых модулей
import React from 'react';
import { View, StyleSheet } from 'react-native';

import appConfig from '../../../static/json/appConfig.json';

import useFocusManagement from '../../../hooks/useFocusManagement';
import { useScreenOffsetControl } from '../../../hooks/useScreenOffsetControl';

import CustomForm from '../../common/CustomForm';
import { componentInstaller } from '../../../utils/componentInstaller';
import { sendToServer } from '../../../services/sendToServer'

import { useUser } from '../../../context/UserContext';

// Основной компонент формы профиля
const DatePredictionForm = ({ onSubmit }) => {
    const { user, setUser } = useUser();

    const onSubmitForm = (data) => {
        setUser(prevUser => ({
            ...prevUser,
            datePrediction: data.datePrediction,
        }));

        sendToServer('datePrediction', data)
            .then(response => {
                console.log("Response from server", response);
            })
            .catch(error => {
                console.error("Error sending astrobot to server: ", error)
            });

        onSubmit();
    }
    const submitText = user.registrated ? "Select" : "Continue";

    // Загрузка метаданных полей из JSON
    const fieldMetadataArray = appConfig[user.language]["datePredictionMetadataArray"];

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
    }));

    return (
        <View {...panResponder.panHandlers}
            style={styles.container}
            onLayout={(event) => {
                const height = event.nativeEvent.layout.height;
                updateContentHeight(height);
                //console.log("Height = ", height);
            }}
        >
            {/* <View style={styles.container}> */}
                <CustomForm
                    fieldsConfig={fieldsConfig}
                    refs={refs}
                    removeFocusFromAll={removeFocusFromAll}
                    initialValues={{
                        datePrediction: new Date(),
                    }}
                    onSubmit={onSubmitForm}
                    submitText={submitText}
                />
            {/* </View> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginTop: 100,
        width: '100%',
        // borderWidth: 1,
        // borderColor: "red"
    }
})

export default DatePredictionForm;