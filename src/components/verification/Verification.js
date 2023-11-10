// LogIn.js
import React, { useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import Container from '../common/Container';
import VerificationForm from './VerificationForm';

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
    const { verifyUser, loading } = useVerification();
    const [authError, setAuthError] = useState(null);
    const [initialValues, setInitialValues] = useState({
        square0: '',
        square1: '',
        square2: '',
        square3: '',
    });

    const commonText = appConfig[user.language]["common"];

    const onSubmit = (values) => {
        //console.log("Verification values = ", values);
        //console.log("Verification user.verificationCode = ", user.verificationCode);
        if (user.verificationCode[0] == values.square0 &&
            user.verificationCode[1] == values.square1 &&
            user.verificationCode[2] == values.square2 &&
            user.verificationCode[3] == values.square3) {
            setAuthError(null);
            setUser(prevUser => ({
                ...prevUser,
                registrated: false,
            }));
            //console.log("Verification onSibmit ")
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

    const onBack = () => {
        navigation.navigate('SignUp');
    }

    useBackHandler(onBack);

    const onResend = async () => {
        const verificationCode = await verifyUser();
        //console.log("Verification onResend");
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
