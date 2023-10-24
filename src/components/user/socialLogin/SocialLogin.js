import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import SocialLoginButton from './SocialLoginButton'; // Предположим, что вы импортировали новый компонент
import facebookLogo from './FacebookLogo.png'; // Убедитесь, что путь верный
import appleLogo from './AppleLogo.png';
import googleLogo from './GoogleLogo.png';

import inputStyles from '../../../styles/InputStyles';

const SocialLogin = () => {
    const handlePress = (platform) => {
        // Ваш код для авторизации
        console.log(`Signing in with ${platform}`);
    };

    return (
        <View style={styles.container}>
            <Text style={inputStyles.text}>Or sign in with...</Text>
            <View style={styles.continueWithSocialsParent}>
                <SocialLoginButton imageSource={facebookLogo} onPress={() => handlePress('Facebook')} />
                <SocialLoginButton imageSource={appleLogo} onPress={() => handlePress('Apple')} style={styles.continueWithAppleLeftAli1} />
                <SocialLoginButton imageSource={googleLogo} onPress={() => handlePress('Google')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    continueWithSocialsParent: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        paddingTop: 10,
    },
    continueWithAppleLeftAli1: {
        marginLeft: 32,
    },
});

export default SocialLogin;