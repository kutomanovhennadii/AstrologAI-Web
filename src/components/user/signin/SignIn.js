// LogIn.js
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import Container from '../../common/Container';
import AstrologAIText from '../../common/AstrologAIText';
import SocialLogin from '../socialLogin/SocialLogin';
import PromptWithActionLink from '../../common/PromptWithActionLink';
import SignInForm from './SignInForm';

const SignIn = ({ navigation }) => {
    console.log("Render Log in")

    const goToSignUp = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={[styles.size100]}>

            {/* <Container topOffset={122}>
                <AstrologAIText />
            </Container> */}
            <Container topOffset={81}>
                <Text style={[styles.inputTitle]}>Sign in to your account</Text>
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
    inputTitle: {
        fontSize: 23,
        lineHeight: 32,
        color: "#fff",
        textAlign: "left",
        fontFamily: "Roboto"
    },
});

export default SignIn;
