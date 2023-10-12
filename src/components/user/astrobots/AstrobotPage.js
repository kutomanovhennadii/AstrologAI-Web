import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

import SubmitButton from "../../common/SubmitButton"
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const AstrobotPage = ({ name, image, description }) => {

    const navigateToNextPage = () => {
        console.log("Навигация на страницу " + name);
    };

    const [fontLoaded, setFontLoaded] = useState(false); // Новое состояние

    // ... (остальной код)

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Raleway-Bold': require('../../../static/fonts/raleway/Raleway-Bold.ttf'),
                'Raleway-Regular': require('../../../static/fonts/raleway/Raleway-Regular.ttf'),
                'Raleway-Black': require('../../../static/fonts/raleway/Raleway-Black.ttf'),
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
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.submitFrame}>
                <SubmitButton text="Select your astrobot" onSubmit={navigateToNextPage} />
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
        padding: 15,
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
        //fontWeight: 'bold',
        marginBottom: 8,
        color: '#9593FB',
        fontFamily: 'Raleway-Bold', // моноширинный шриф
    },
    description: {
        fontSize: 16,
        height: 210,
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Roboto',
        textAlign: 'justify',
        letterSpacing: 0.5
    },
    submitFrame: {
        width: screenWidth - 30,
        //position: 'absolute',

        //bottom: 50,
        // left: 0,
        // right: 0,
    },
});

export default AstrobotPage;