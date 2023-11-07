import React, { useState } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import SocialLoginButton from './SocialLoginButton'; // Предположим, что вы импортировали новый компонент
import facebookLogo from './FacebookLogo.png'; // Убедитесь, что путь верный
import appleLogo from './AppleLogo.png';
import googleLogo from './GoogleLogo.png';

import inputStyles from '../../../styles/InputStyles';
import { useSocialAuthentication } from '../../../hooks/useSocialAuthentication';
import { googleService } from '../../../services/googleService';
import { facebookService } from '../../../services/facebookService';

import { useUser } from '../../../context/UserContext';
import appConfig from '../../../static/json/appConfig.json';

const SocialLogin = () => {
    const [authError, setAuthError] = useState(null);
    const { user, setUser } = useUser();

    const commonText = appConfig[user.language]["common"];

    const handlePress = (platform) => {
        // Ваш код для авторизации
        console.log(`Signing in with ${platform}`);
    };

    // Использование хука для аутентификации через Google
    const { authenticateUser: authenticateGoogleUser, loading: loadingGoogle } = useSocialAuthentication(googleService);

    // Использование хука для аутентификации через Facebook
    const { authenticateUser: authenticateFacebookUser, loading: loadingFacebook } = useSocialAuthentication(facebookService);

    const onGoogleSubmit = async () => {
        const isAuthenticated = await authenticateGoogleUser();
        if (!isAuthenticated) {
            setAuthError(commonText["Oops! Something went wrong with Google sign in. Care to try again?"]);
        }
    };

    const onFacebookSubmit = async () => {
        const isAuthenticated = await authenticateFacebookUser();
        if (!isAuthenticated) {
            setAuthError(commonText["Oops! Something went wrong with Facebook sign in. Care to try again?"]);
        }
    };
    const loading = loadingGoogle || loadingFacebook;

    return (
        <View style={styles.container}>
            <Text style={inputStyles.text}>
                {commonText["Or sign in with..."]}
            </Text>
            <View style={styles.continueWithSocialsParent}>
                <SocialLoginButton imageSource={facebookLogo} onPress={onFacebookSubmit} />
                <SocialLoginButton imageSource={appleLogo} onPress={() => handlePress('Apple')} style={styles.continueWithAppleLeftAli1} />
                <SocialLoginButton imageSource={googleLogo} onPress={onGoogleSubmit} />
            </View>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {authError && <Text>{authError}</Text>}
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