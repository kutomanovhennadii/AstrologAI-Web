import React, { useState } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import SocialLoginButton from './SocialLoginButton'; // Предположим, что вы импортировали новый компонент
import facebookLogo from './FacebookLogo.png'; // Убедитесь, что путь верный
import appleLogo from './AppleLogo.png';
import googleLogo from './GoogleLogo.png';

import inputStyles from '../../styles/InputStyles';
import { useSocialAuthentication } from '../../hooks/useSocialAuthentication';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';

const SocialLogin = ({ navigation }) => {
    const [authError, setAuthError] = useState(null);
    const { user, setUser } = useUser();
    const { authenticateSocial, loading } = useSocialAuthentication();
    const commonText = appConfig[user.language]["common"];

    const onSubmit = async (values) => {
        console.log("onSubmit", values);
        setAuthError("");

        const response = await authenticateSocial(values);
        console.log("onSubmit response", response);

        if (response.success) {
            navigation.navigate('GreetingForm');
        } else {
            setAuthError(response.error);
        }
    };
  
    return (
        <View style={styles.container}>
            <Text style={inputStyles.text}>
                {commonText["Or sign in with..."]}
            </Text>
            <View style={styles.continueWithSocialsParent}>
                <SocialLoginButton imageSource={facebookLogo} onPress={() => onSubmit("facebook")} />
                <SocialLoginButton imageSource={appleLogo} onPress={() => onSubmit("apple")} style={styles.continueWithAppleLeftAli1} />
                <SocialLoginButton imageSource={googleLogo} onPress={() => onSubmit("google")} />
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