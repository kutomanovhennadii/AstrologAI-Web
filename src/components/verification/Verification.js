// LogIn.js
import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Container from '../common/Container';
import VerificationForm from './VerificationForm';
import { useRegistration } from '../../hooks/useRegistration';

import inputStyles from '../../styles/InputStyles';
import designConstants from '../../styles/designConstants';
import colors from '../../styles/colors';

import useBackHandler from '../../hooks/useBackHandler';

import { useUser } from '../../context/UserContext';
import { useVerification } from '../../hooks/useVerification';
import appConfig from '../../static/json/appConfig.json';

const Verification = ({ navigation }) => {
    //console.log("Render Verification")

    const { user, setUser } = useUser();
    const { verifyUser, loading: verificationLoading } = useVerification();
    const { registerUser, loading: registrationLoading } = useRegistration();
    const [authError, setAuthError] = useState(null);
    const [initialValues, setInitialValues] = useState({
        square0: '',
        square1: '',
        square2: '',
        square3: '',
    });

    const commonText = appConfig[user.language]["common"];

    const onSubmit = async (values) => {
        let name = user.name
        let email = user.email
        let password = user.password
        let verification = values.square0 + values.square1 + values.square2 + values.square3

        const response = await verifyUser({ name, email, password, verification });
        console.log("onResend - response", response)

        if (response.success) {
            console.log("onResend - success")
            navigation.navigate('GreetingForm');
        } else {
            setAuthError(response.error);
            setInitialValues({
                square0: '',
                square1: '',
                square2: '',
                square3: '',
            });
        }
    };

    const onBack = () => {
        navigation.navigate('SignUp');
    }

    useBackHandler(onBack);

    const onResend = async () => {
        console.log("onResend")

        let name = user.name
        let email = user.email
        let password = user.password
        const response = await registerUser({ name, email, password });
        console.log("onResend - response", response)

        if (response.success) {

            navigation.navigate('Profile');
        } else {
            setAuthError(response.error);
            setInitialValues({
                square0: '',
                square1: '',
                square2: '',
                square3: '',
            });
        }
    }

    return (
        <View style={[inputStyles.size100]}>

            <Container topOffset={designConstants.topOffset40}>
                <Text style={[inputStyles.titleText, styles.title]}>
                    {commonText["Verification"]}
                </Text>
            </Container>

            <Container topOffset={designConstants.topOffset40}>
                <Text style={[inputStyles.text, styles.enterCode]}>
                    {commonText["Enter the code we just send you on your email address"]}
                </Text>
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

            {(verificationLoading || registrationLoading) && (
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
