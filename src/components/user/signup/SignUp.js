import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Container from '../../common/Container';

import SocialLogin from '../socialLogin/SocialLogin';
import PromptWithActionLink from '../../common/PromptWithActionLink';

import SignUpForm from './SignUpForm';
import inputStyles from '../../../styles/InputStyles';
import { useVerification } from '../../../hooks/useVerification';

import { useUser } from '../../../context/UserContext';
import appConfig from '../../../static/json/appConfig.json';

const SignUp = ({ navigation, route }) => {
    const { termsAccepted = false } = (route && route.params) || {};
    const { user, setUser } = useUser();
    const { verifyUser, loading } = useVerification();

    const commonText = appConfig[user.language]["common"];

    const goToSignIn = () => {
        navigation.navigate('SignIn');
    };

    const goToTerms = () => {
        navigation.navigate('Terms');
    };

    const goToVerification = async (value) => {
        //console.log("SignUp goToVerification value = ", value)
        setUser(prevUser => ({
            ...prevUser,
            name: value.userName,
            email: value.email,
            password: value.password
        }));
        const verificationCode = await verifyUser();
        navigation.navigate('Verification');
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={[inputStyles.size100]}>

            <Container topOffset={0}>
                <Text style={[inputStyles.titleText]}>
                    {commonText["Sign Up"]}
                </Text>
            </Container>

            <SignUpForm
                termsAccepted={termsAccepted}
                goToTerms={goToTerms}
                onSubmit={goToVerification}
            />
            <SocialLogin />
            <View style={inputStyles.bottom10}>
                <PromptWithActionLink
                    promt={commonText["Have an account?"]}
                    buttonText={commonText["Sign In"]}
                    onLinkPress={goToSignIn} />
            </View>
        </View>);
};

export default SignUp;
