import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';
import designConstants from '../../../styles/designConstants';

const Menu = () => {

    const onSubmitAstrobot = () => {
        console.log('Astrobot button clicked');
    };

    const onSubmitLanguage = () => {
        console.log('Language button clicked');
    };

    const onSubmitContent = () => {
        console.log('Content button clicked');
    };

    const onSubmitSubscription = () => {
        console.log('Subscription button clicked');
    };

    const onSubmitLogout = () => {
        console.log('Log out button clicked');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onSubmitAstrobot}>
                <Text style={styles.text}>Astrobot</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSubmitLanguage}>
                <Text style={styles.text}>Language</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSubmitContent}>
                <Text style={styles.text}>Content</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSubmitSubscription}>
                <Text style={styles.text}>Subscription</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSubmitLogout}>
                <Text style={styles.text}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: designConstants.borderRadius,
        backgroundColor: colors.darkSeaGreen,
        width: '100%',
        height: designConstants.inputHeight,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7,
        //borderWidth: 1,
        //borderColor: colors.blueBell
        //top: 15,
    },
    text: {
        letterSpacing: 1,
        textTransform: 'uppercase',
        color: '#000',
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "Raleway-SemiBold",
    },
});

export default Menu;