import React, { useState } from 'react';
import { StyleSheet, Text, View } from "react-native";

import Container from '../../common/Container';
import AstrologAIText from '../../common/AstrologAIText';
import SocialLogin from '../socialLogin/SocialLogin';
import PromptWithActionLink from '../../common/PromptWithActionLink';
import SignUpForm from './SignUpForm';
import SignUpForm1 from './SignUpForm1';
import inputStyles from '../../../styles/InputStyles';

const SignUp = ({ navigation, route }) => {
    const { termsAccepted = false } = (route && route.params) || {};
    console.log("Render Sign Up. termsAccepted = " + route);

    const goToSignIn = () => {
        navigation.navigate('SignIn');
    };

    const goToTerms = () => {
        navigation.navigate('Terms');
    };

    const goToVerification = () => {
        navigation.navigate('Verification');
    };

    return (
        <View style={[inputStyles.size100]}>

            {/* <Container topOffset={0}>
                <View style={inputStyles.scaledLogo}>
                    <AstrologAIText />
                </View>
            </Container> */}
            <Container topOffset={0}>
                <Text style={[inputStyles.titleText]}>Sign up</Text>
            </Container>

            <SignUpForm1
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
