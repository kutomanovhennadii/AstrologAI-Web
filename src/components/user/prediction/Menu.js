import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import inputStyles from '../../../styles/InputStyles';
import colors from '../../../styles/colors';
import designConstants from '../../../styles/designConstants';

import Astrobots from '../astrobots/Astrobots'
import Profile from '../profile/Profile'
import LanguageForm from '../language/LanguageForm'

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(null);

    const onSubmitProfile = () => {
        console.log('Profile button clicked');
        setSelectedMenu('Profile');
    };

    const onSubmitAstrobot = () => {
        console.log('Astrobot button clicked');
        setSelectedMenu('Astrobot');
    };

    const onSubmitLanguage = () => {
        console.log('Language button clicked');
        setSelectedMenu('Language');
    };

    const onSubmitContent = () => {
        console.log('Content button clicked');
        setSelectedMenu('Content');
    };

    const onSubmitSubscription = () => {
        console.log('Subscription button clicked');
        setSelectedMenu('Subscription');
    };

    const onSubmitLogout = () => {
        console.log('Log out button clicked');
        setSelectedMenu('Logout');
    };

    const resetMenu = () => {
        setSelectedMenu(null);
    };

    return (
        <View style={styles.container}>
            {selectedMenu === null && (
                <>
                    <TouchableOpacity style={styles.button} onPress={onSubmitAstrobot}>
                        <Text style={styles.text}>Astrobot</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onSubmitProfile}>
                        <Text style={styles.text}>Profile</Text>
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
                </>
            )}

            {selectedMenu === 'Astrobot' && <Astrobots onSubmit={resetMenu} />}
            {selectedMenu === 'Profile' && <Profile onSubmit={resetMenu} />}
            {selectedMenu === 'Language' && <LanguageForm onSubmit={resetMenu} />}
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
        backgroundColor: colors.blueBell,
        width: '100%',
        height: designConstants.inputHeight,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7,
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