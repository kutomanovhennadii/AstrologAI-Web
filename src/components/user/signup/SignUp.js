import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Container from '../../common/Container';

import SocialLogin from '../socialLogin/SocialLogin';
import PromptWithActionLink from '../../common/PromptWithActionLink';

import SignUpForm from './SignUpForm';
import inputStyles from '../../../styles/InputStyles';
import { useVerification } from '../../../hooks/useVerification';
import { useUser } from '../../../context/UserContext';

const SignUp = ({ navigation, route }) => {
    const { termsAccepted = false } = (route && route.params) || {};
    const { user, setUser } = useUser();
    const { verifyUser, loading } = useVerification();

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
                <Text style={[inputStyles.titleText]}>Sign up</Text>
            </Container>

            <SignUpForm
                termsAccepted={termsAccepted}
                goToTerms={goToTerms}
                onSubmit={goToVerification}
            />
            <SocialLogin />
            <View style={inputStyles.bottom10}>
                <PromptWithActionLink
                    promt="Have an account?"
                    buttonText="Sign In"
                    onLinkPress={goToSignIn} />
            </View>
        </View>);
};

const styles = StyleSheet.create({
    // size100: {
    //     width: "100%",
    //     height: "100%",
    // },
    // bottom10: {
    //     paddingBottom: 10,
    // },
});


export default SignUp;
