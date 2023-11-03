// LogIn.js
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Container from '../../common/Container';
import AstrologAIText from '../../common/AstrologAIText';
import SocialLogin from '../socialLogin/SocialLogin';
import PromptWithActionLink from '../../common/PromptWithActionLink';
import SignInFormOld from './SignInFormOld';
import SignInForm from './SignInForm';
import inputStyles from '../../../styles/InputStyles';

import { useAuthentication } from '../../../hooks/useAuthentication';
import { useUser } from '../../../context/UserContext';

const SignIn = ({ navigation }) => {

    const { authenticateUser, loading } = useAuthentication();
    const [authError, setAuthError] = useState(null);
    const [initialValues, setInitialValues] = useState({ email: '', password: '' });

    // useEffect(() => {
    //     console.log('SignInForm mounted or updated');
    // }, []);

    //console.log("SignIn loading = ", loading)

    const goToSignUp = () => {
        navigation.navigate('SignUp');
    };

    const onSubmit = async (values) => {
        //console.log('onSubmit called', values);
        const isAuthenticated = await authenticateUser(values);
        //console.log('SignIn onSubmit isAuthenticated=', isAuthenticated);
        if (!isAuthenticated) {
            setAuthError("Yikes! Something went sideways. Care to try again?");
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

            <Container topOffset={80}>
                <Text style={[inputStyles.titleText]}>Sign in to your account</Text>
            </Container>

            {authError && <Text style={inputStyles.errorText}>{authError}</Text>}

            <SignInForm onSubmit={onSubmit} initialValues={initialValues} />

            <View style={styles.top50}>
                <SocialLogin />
            </View>

            <View style={inputStyles.bottom10}>
                <PromptWithActionLink
                    promt="Have an account?"
                    buttonText="Sign Up"
                    onLinkPress={goToSignUp} />
            </View>
        </View>);
};

const styles = StyleSheet.create({
    top50: {
        flex: 1,
        marginTop: 100
    },

    // scaled: {
    //     paddingTop: 25,
    //     marginBottom: -20,
    //     transform: [{ scale: 0.5 }],
    // },

});

export default SignIn;
