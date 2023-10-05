// AstrologAIText.js
import React from 'react';
import { Text, StyleSheet } from 'react-native';

const AstrologAIText = () => {
    return <Text style={styles.text}>AstrologAI</Text>;
};

const styles = StyleSheet.create({
    text: {
        fontSize: 57,
        letterSpacing: 1,
        lineHeight: 60,
        fontFamily: "Roboto",
        color: "#A9ACB6",
        // color: "#3f51b5",
        textAlign: "center",
    },
});

export default AstrologAIText;