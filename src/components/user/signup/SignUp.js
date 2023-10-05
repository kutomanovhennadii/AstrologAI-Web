import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import Container from '../../common/Container';
import AstrologAIText from '../../common/AstrologAIText';
import SocialLogin from '../socialLogin/SocialLogin';
import PromptWithActionLink from '../common/PromptWithActionLink';
import SignUpForm from './SignUpForm';

const SignUp = ({ navigation }) => {
    console.log("Render Sign Up")

    const goToSignIn = () => {
        navigation.navigate('SignIn');
    };

    return (
        <View style={[styles.size100]}>

            <Container topOffset={122}>
                <AstrologAIText />
            </Container>
            <Container topOffset={41}>
                <Text style={[styles.inputTitle]}>Sign up</Text>
            </Container>

            <SignUpForm onSubmit={(values) => { console.log(values); }} />
            <SocialLogin />
            <PromptWithActionLink
                promt="Have an account?"
                buttonText="Sign In"
                onLinkPress={goToSignIn} />

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


export default SignUp;
