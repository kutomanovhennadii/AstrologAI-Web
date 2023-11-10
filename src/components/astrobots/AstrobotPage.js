import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

import SubmitButton from "../common/SubmitButton"
import { Dimensions } from 'react-native';
import inputStyles from '../../styles/InputStyles';
import designConstants from '../../styles/designConstants';
import colors from '../../styles/colors';
import appConfig from '../../static/json/appConfig.json';
import { useUser } from '../../context/UserContext';

const screenWidth = Dimensions.get('window').width;

const AstrobotPage = ({ name, title, image, description, onSubmit }) => {

    const { user, setUser } = useUser();
    const commonText = appConfig[user.language]["common"];

    const selectAstrobot = () => {
        //console.log("Selected astrobot ", name)
        onSubmit(name);
    };

    const [fontLoaded, setFontLoaded] = useState(false); // Новое состояние

    // ... (остальной код)

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Raleway-Bold': require('../../static/fonts/raleway/Raleway-Bold.ttf'),
                'Raleway-Regular': require('../../static/fonts/raleway/Raleway-Regular.ttf'),
                'Raleway-Black': require('../../static/fonts/raleway/Raleway-Black.ttf'),
            });
            setFontLoaded(true); // Установка состояния после загрузки шрифтов
        }
        loadFonts();
    }, []);

    if (!fontLoaded) {
        return <Text>Loading...</Text>; // Заглушка на время загрузки шрифтов
    }

    return (
        <View style={styles.container}>
            <Image
                source={image}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.name}>{title}</Text>
                <Text style={[inputStyles.text, styles.description]}>{description}</Text>
            </View>
            <View style={styles.submitFrame}>
                <SubmitButton text={commonText["Select your astrobot"]} onSubmit={selectAstrobot} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center', // Выравнивание по центру по горизонтали
        justifyContent: 'flex-start', // Выравнивание по верхнему краю
        height: 710, // Желаемая высота
        width: screenWidth,
        padding: 16,
        // borderWidth: 1,
        // borderColor: "red" 
    },
    textContainer: {
        alignItems: 'center', // Выравнивание текста по центруalignItems: 'center', // Выравнивание текста по центру
        width: screenWidth,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 15,
        // borderWidth: 1,
        // borderColor: "red" 

    },
    image: {
        width: 280,
        height: 280,
        marginTop: 0, // Отступ сверху
        //marginBottom: 10,
        // borderWidth: 1,
        // borderColor: "red", 
    },
    name: {
        fontSize: 32,
        marginBottom: 8,
        color: colors.blueBell,
        fontFamily: 'Raleway-Bold', // моноширинный шриф
    },
    description: {
        lineHeight: 19,
        height: 250,
        textAlign: 'justify',
        letterSpacing: 0.5
    },
    submitFrame: {
        width: "100%",

    },
});

export default AstrobotPage;