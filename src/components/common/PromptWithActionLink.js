import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import inputStyles from '../../styles/InputStyles';

const PromptWithActionLink = ({ promt, buttonText, onLinkPress }) => {
    return (
        <View style={styles.container}>
            <Text style={[inputStyles.text]}>{promt} </Text>
            <TouchableOpacity onPress={onLinkPress}>
                <Text style={[inputStyles.text, styles.link]}>{buttonText}</Text>
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
    link: {
        color: "#2962ff",
    },
});

export default PromptWithActionLink;