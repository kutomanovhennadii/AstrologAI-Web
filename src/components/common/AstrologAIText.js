// AstrologAIText.js
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import { Svg, Polygon } from 'react-native-svg';

import * as Font from 'expo-font';
import colors from '../../styles/colors';

const AstrologAIText = () => {
    //console.log("Render AstrologAIText")

    return (
        <View style={styles.container}>
            <Text style={styles.text}>AstrologA</Text>
            <View style={styles.iContainer}>
                <Text style={styles.text}>I</Text>

                {/* <Svg style={styles.star} height="60" width="100">
                    <Polygon
                        points="55,0 58,13 67,10 63,17 80,20 63,24 68,30 58,28 55,45 52,28 43,30 48,23 0,20 48,18 43,11 52,13"
                        fill={colors.gold}
                    />
                </Svg> */}
            </View>
            {/* <Image
                source={require('../../static/image/Star2.png')}
                style={styles.imageStyle}
            /> */}
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
        fontFamily: 'Raleway-Black',
        color: colors.blueBell,
        //color: '#9593FB',
        textAlign: 'center',
        letterSpacing: 2.5,
    },
    star: {
        position: 'absolute',
        marginTop: -5,
        //left: '50%',
        marginLeft: -45,  // половина ширины SVG
    },
    imageStyle: {
        width: 70,
        height: 30,
        position: 'absolute',
        // Смещение относительно верхнего и левого края (или других краев)
        top: 0,  // Или любое другое значение
        left: 311, // Или любое другое значение
    }
});
export default AstrologAIText;