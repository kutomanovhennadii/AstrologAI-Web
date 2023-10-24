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
        <View style={[inputStyles.size100]}>

            {/* <Container topOffset={0}>
                <View style={inputStyles.scaledLogo}>
                    <AstrologAIText />
                </View>
            </Container> */}
            <Container topOffset={80}>
                <Text style={[inputStyles.titleText]}>Sign in to your account</Text>
            </Container>

            <SignInForm onSubmit={(values) => { console.log(values); }} />
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
