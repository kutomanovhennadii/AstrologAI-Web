// LogIn.js
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import Container from '../../common/Container';
import VerificationFrame from './VerificationFrame';

const Verification = ({ navigation }) => {
    console.log("Render Verification")

    return (
        <View style={[styles.size100]}>

            <Container topOffset={98}>
                <Text style={styles.title}>Verification</Text>
            </Container>
            <Container topOffset={30}>
                <Text style={styles.enterCode}>Enter the code we just send you on your email address</Text>
            </Container>
            <VerificationFrame />
            <Container topOffset={83}>
                <View style={styles.title}>
                    <Text style={styles.ifYouDont}>{`If you don’t receive a code?`}</Text>
                    <Text style={styles.ressend}>RESEND</Text>
                </View>

            </Container>

        </View>);
};

const styles = StyleSheet.create({
    size100: {
        width: "100%",
        height: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        fontFamily: "Roboto",
        color: "#fff",
        textAlign: "center"
    },
    enterCode: {
        fontSize: 20,
        fontWeight: "600",
        fontFamily: "Roboto",
        color: "#fff",
        textAlign: "center",
        //width: 323
    },
    ifYouDont: {
        color: "#fff",
        textAlign: "center"
    },
    ressend: {
        color: "#1877f2",
        textAlign: "center"
    },
});

export default Verification;
