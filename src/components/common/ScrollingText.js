import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import colors from '../../styles/colors';
import inputStyles from '../../styles/InputStyles';
import designConstants from '../../styles/designConstants';

const ScrollingText = ({ text, maxHeight }) => {
    //const screenWidth = Dimensions.get('window').width;
    //const calculatedWidth = screenWidth - 2*36; // Учитывая отступы слева и справа

    return (
        <View style={styles.textBackground}>
            <ScrollView style={{ maxHeight }}>
                <Text style={[inputStyles.text, styles.text, inputStyles.width100]}>{text}</Text>
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
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        alignSelf: 'center',
        padding: 20,
        borderRadius: designConstants.borderRadius, 
    },
});

export default ScrollingText;