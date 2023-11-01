// LogIn.js
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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

    const { authenticateUser } = useAuthentication();
    const [authError, setAuthError] = useState(null);

    console.log("Render Log in")

    const goToSignUp = () => {
        navigation.navigate('SignUp');
    };
    
    const onSubmit = (values) => {
        const isAuthenticated = authenticateUser(values);
        if (!isAuthenticated) {
            setAuthError("Yikes! Something went sideways. Care to try again?"); // устанавливаем сообщение об ошибке
        }
    };

    return (
        <View style={[inputStyles.size100]}>

            <Container topOffset={80}>
                <Text style={[inputStyles.titleText]}>Sign in to your account</Text>
            </Container>

            {authError && <Text style={inputStyles.errorText}>{authError}</Text>} 

            <SignInForm onSubmit={onSubmit} />
            <View style={styles.top50}>
                <SocialLogin />
            </View>

            <View style={inputStyles.bottom10}>
                <PromptWithActionLink
                    promt="Have an account?"
                    buttonText="Sign In"
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
