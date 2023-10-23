// LogIn.js
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import Container from '../../common/Container';
import AstrologAIText from '../../common/AstrologAIText';
import SocialLogin from '../socialLogin/SocialLogin';
import PromptWithActionLink from '../../common/PromptWithActionLink';
import SignInFormOld from './SignInFormOld';
import SignInForm from './SignInForm';
import inputStyles from '../../../styles/InputStyles';

const SignIn = ({ navigation }) => {
    console.log("Render Log in")

    const goToSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={[styles.size100]}>

            <Container topOffset={80}>
                <View style={styles.scaled}>
                    <AstrologAIText />
                </View>
            </Container>
            <Container topOffset={80}>
                <Text style={[inputStyles.titleText]}>Sign in to your account</Text>
            </Container>

            <SignInForm onSubmit={(values) => { console.log(values); }} />
            <SocialLogin />
            <PromptWithActionLink
                promt="Have an account?"
                buttonText="Sign Up"
                onLinkPress={goToSignUp} />

        </View>);
};

const styles = StyleSheet.create({
    size100: {
        width: "100%",
        height: "100%",
    },

    scaled: {
        transform: [{ scale: 0.75 }],
    },

});

export default SignIn;
