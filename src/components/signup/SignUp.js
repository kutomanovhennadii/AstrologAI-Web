import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Container from '../common/Container';
import SocialLogin from '../socialLogin/SocialLogin';
import PromptWithActionLink from '../common/PromptWithActionLink';
import SignUpForm from './SignUpForm';
import inputStyles from '../../styles/InputStyles';
import { useRegistration } from '../../hooks/useRegistration';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';

const SignUp = ({ navigation, route }) => {
    const { termsAccepted = false } = (route && route.params) || {};
    const { user, setUser } = useUser();
    const [authError, setAuthError] = useState(null);
    const [initialValues, setInitialValues] = useState({ name: '', email: '', password: '' });
    const { registerUser, loading } = useRegistration();

    const commonText = appConfig[user.language]["common"];

    const goToSignIn = () => {
        navigation.navigate('SignIn');
    };

    const goToTerms = () => {
        navigation.navigate('Terms');
    };

    const onSubmit = async (values) => {
        console.log("onSubmit", values);
        setUser(prevUser => ({
            ...prevUser,
            name: values.name,
            email: values.email,
            password: values.password,
        }));

        const response = await registerUser(values);

        if (response.success) {
            if (response.status === 200 && !user.is_registration_completed) {
                navigation.navigate('GreetingForm');
            }
            else if (response.status === 201) {
                navigation.navigate('Verification');
            }
        } else {
            setAuthError(response.error);
            setInitialValues(values); // Сохраняем введенные данные
        }
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

            {authError && <Text style={inputStyles.errorText}>{authError}</Text>}

            <SignUpForm
                initialValues={initialValues}
                termsAccepted={termsAccepted}
                goToTerms={goToTerms}
                onSubmit={onSubmit}
            />
            <SocialLogin
                navigation={navigation}
            />
            <View style={inputStyles.bottom10}>
                <PromptWithActionLink
                    promt={commonText["Have an account?"]}
                    buttonText={commonText["Sign In"]}
                    onLinkPress={goToSignIn} />
            </View>
        </View>);
};

export default SignUp;
