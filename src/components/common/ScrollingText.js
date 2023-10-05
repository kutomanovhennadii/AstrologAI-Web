import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const ScrollingText = ({ text, maxHeight }) => {
    const screenWidth = Dimensions.get('window').width;
    const calculatedWidth = screenWidth - 2*36; // Учитывая отступы слева и справа

    return (
        <View style={styles.textBackground}>
            <ScrollView style={{ maxHeight }}>
                <Text style={{ ...styles.text, width: calculatedWidth }}>{text}</Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: "Roboto",
        color: "#000",
        textAlign: "left",
        flex: 1
    },
    textBackground: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
    },
});

export default ScrollingText;