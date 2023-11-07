import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import colors from '../../styles/colors';
import inputStyles from '../../styles/InputStyles';
import designConstants from '../../styles/designConstants';

const ScrollingText = ({ text, maxHeight }) => {
    return (
        <View style={styles.textBackground}>
            <ScrollView style={{ maxHeight }}>
                {/* Первая строка жирным шрифтом */}
                <Text style={[inputStyles.text, styles.text, inputStyles.width100, { fontWeight: 'bold' }]}>
                    {text[0]}
                    {'\n'}
                </Text>
                {/* Оставшийся текст */}
                {text.slice(1).map((line, index) => (
                    <Text key={index} style={[inputStyles.text, styles.text, inputStyles.width100]}>
                        {line}
                        {'\n'}
                    </Text>
                ))}
                {/* <Text style={[inputStyles.text, styles.text, inputStyles.width100]}>{text}</Text> */}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        letterSpacing: 0,
        color: "#000",
        textAlign: 'justify'
    },
    textBackground: {
        backgroundColor: colors.backdropColorLight,
        alignSelf: 'center',
        padding: 20,
        borderRadius: designConstants.borderRadius,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default ScrollingText;