// LogIn.js
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import Container from '../../common/Container';
import VerificationForm from './VerificationForm';
import GreetingForm from '../greeting/GreetingForm'

import inputStyles from '../../../styles/InputStyles';
import designConstants from '../../../styles/designConstants';
import colors from '../../../styles/colors';

const Verification = ({ navigation }) => {
    console.log("Render Verification")

    const goToGreeting = () => {
        navigation.navigate('GreetingForm');
    };

    return (
        <View style={[inputStyles.size100]}>

            <Container topOffset={designConstants.topOffset40}>
                <Text style={[inputStyles.titleText, styles.title]}>Verification</Text>
            </Container>
            <Container topOffset={designConstants.topOffset40}>
                <Text style={[inputStyles.text, styles.enterCode]}>Enter the code we just send you on your email address</Text>
            </Container>
            <VerificationForm onSubmit={goToGreeting } />
        </View>);
};

const styles = StyleSheet.create({
    title: {
        textAlign: "center"
    },
    enterCode: {
        fontSize: 20,
        textAlign: "center",
    },
});

export default Verification;
