import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const GreetingPage = ({ imageSource, headerText, bodyText }) => {


    return (
        <View style={styles.container}>
            <Image style={styles.image} resizeMode="cover" source={imageSource} />
            <View style={styles.textContainer}>
                <Text style={styles.header}>{headerText}</Text>
                <Text style={styles.body}>{bodyText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginTop: 107,
    },
    image: {
        width: 320,
        height: 180,
    },
    textContainer: {
        padding: 16,
        marginTop: 68,
        width: screenWidth ,
    },
    header: {
        fontSize: 34,
        lineHeight: 40,
        color: '#e8eaf6',
        textAlign: 'center',
        fontFamily: 'Roboto',
        flexWrap: 'wrap',
    },
    body: {
        fontSize: 23,
        lineHeight: 32,
        marginTop: 24,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto',
        marginTop: 24,
        flexWrap: 'wrap',
    },
    
});

export default GreetingPage;