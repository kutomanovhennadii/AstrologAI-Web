// LogIn.js
import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Container from '../../common/Container';
import VerificationForm from './VerificationForm';
import GreetingForm from '../greeting/GreetingForm'

import inputStyles from '../../../styles/InputStyles';
import designConstants from '../../../styles/designConstants';
import colors from '../../../styles/colors';

import { useUser } from '../../../context/UserContext';
import { useVerification } from '../../../hooks/useVerification';

const Verification = ({ navigation }) => {
    //console.log("Render Verification")

    const { user, setUser } = useUser();
    const { verifyUser, loading } = useVerification();
    const [authError, setAuthError] = useState(null);
    const [initialValues, setInitialValues] = useState({
        square0: '',
        square1: '',
        square2: '',
        square3: '',
    });

    const onSubmit = (values) => {
        console.log("Verification values = ", values);
        console.log("Verification user.verificationCode = ", user.verificationCode);
        if (user.verificationCode[0] == values.square0 &&
            user.verificationCode[1] == values.square1 &&
            user.verificationCode[2] == values.square2 &&
            user.verificationCode[3] == values.square3) {
            setAuthError(null);
            navigation.navigate('GreetingForm');
        }
        else {
            setAuthError("Something went sideways. Care to try again?");
            setInitialValues({
                square0: '',
                square1: '',
                square2: '',
                square3: '',
            }); // Сохраняем введенные данные
        }
    };

    const onResend = async () => {
        const verificationCode = await verifyUser();
        console.log("Verification onResend");
    }

    return (
        <View style={[inputStyles.size100]}>

            <Container topOffset={designConstants.topOffset40}>
                <Text style={[inputStyles.titleText, styles.title]}>Verification</Text>
            </Container>
            
            <Container topOffset={designConstants.topOffset40}>
                <Text style={[inputStyles.text, styles.enterCode]}>Enter the code we just send you on your email address</Text>
            </Container>
            
            {authError && <Text
                style={[inputStyles.errorText, inputStyles.textAlignCenter]}
            >
                {authError}
            </Text>}

            <VerificationForm
                onSubmit={onSubmit}
                onResend={onResend}
                initialValues={initialValues}
            />

            {loading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}

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
