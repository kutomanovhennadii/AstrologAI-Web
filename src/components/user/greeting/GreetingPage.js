import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

import inputStyles from '../../../styles/InputStyles';
import designConstants from '../../../styles/designConstants';
import colors from '../../../styles/colors';

const screenWidth = Dimensions.get('window').width;
const imageHeight = screenWidth * 9 / 16;

const GreetingPage = ({ imageSource, headerText, bodyText }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} resizeMode="cover" source={imageSource} />
            <View style={styles.textContainer}>
                <Text style={[inputStyles.text, styles.header]}>{headerText}</Text>
                <Text style={[inputStyles.text, styles.body]}>{bodyText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
        // borderWidth: 1,
        // borderColor: "red" 
    },
    image: {
        width: screenWidth,
        height: imageHeight,
    },
    textContainer: {
        //padding: 16,
        marginTop: 10,
        width: screenWidth-30,

    },
    header: {
        fontSize: 34,
        lineHeight: 40,
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    body: {
        fontSize: 16,
        //lineHeight: 32,
        paddingTop: 10,
        textAlign: 'justify',
        flexWrap: 'wrap',
        // borderWidth: 1,
        // borderColor: "red" 
    },

});

export default GreetingPage;