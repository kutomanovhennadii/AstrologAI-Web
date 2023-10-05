import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const PromptWithActionLink = ({ promt, buttonText, onLinkPress }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.commonText]}>{promt} </Text>
            <TouchableOpacity onPress={onLinkPress}>
                <Text style={[styles.link, styles.commonText]}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    commonText: {
        fontSize: 16,
        letterSpacing: 1,
        lineHeight: 24,
        fontFamily: "Roboto",
    },
    text: {
        color: "#fff",
    },
    link: {
        color: "#2962ff",
    },
});

export default PromptWithActionLink;