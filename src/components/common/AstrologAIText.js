// AstrologAIText.js
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Svg, Polygon } from 'react-native-svg';

import * as Font from 'expo-font';

const AstrologAIText = () => {
    console.log("Render AstrologAIText")

    const [fontLoaded, setFontLoaded] = useState(false); // Новое состояние

    // ... (остальной код)

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'Raleway-SemiBold': require('../../static/fonts/raleway/Raleway-SemiBold.ttf'),
                'Raleway-Regular': require('../../static/fonts/raleway/Raleway-Regular.ttf'),
                'Raleway-Black': require('../../static/fonts/raleway/Raleway-Black.ttf'),
                'Raleway-Heavy': require('../../static/fonts/raleway.heavy.ttf'),
            });
            setFontLoaded(true); // Установка состояния после загрузки шрифтов
        }
        loadFonts();
    }, []);

    if (!fontLoaded) {
        return <Text>Loading...</Text>; // Заглушка на время загрузки шрифтов
    }


    // return <Text style={styles.text}>AstrologAI</Text>;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>AstrologA</Text>
            <View style={styles.iContainer}>
                <Text style={styles.text}>I</Text>
                <Svg style={styles.star} height="60" width="100">
                    <Polygon
                        points="55,0 58,13 67,10 63,17 75,20 63,24 68,30 58,28 55,45 52,28 43,30 48,23 0,20 48,18 43,11 52,13"
                        fill="gold"
                    />
                </Svg>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
    },
    iContainer: {
        position: 'relative',
    },
    text: {
        fontSize: 60,
        fontFamily: 'Raleway-Heavy',
        color: '#9593FB',
        textAlign: 'center',
        letterSpacing: 2.5,
    },
    star: {
        position: 'absolute',
        marginTop: -18,
        //left: '50%',
        marginLeft: -45,  // половина ширины SVG
    },
});
export default AstrologAIText;