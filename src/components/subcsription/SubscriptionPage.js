import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Dimensions } from 'react-native';

import FeatureBox from '../common/FeatureBox';
import Container from '../common/Container';
import SubmitButton from '../common/SubmitButton';

import inputStyles from '../../styles/InputStyles';
import colors from '../../styles/colors';
import designConstants from '../../styles/designConstants';

import { useUser } from '../../context/UserContext';
import appConfig from '../../static/json/appConfig.json';

const { width, height } = Dimensions.get('window');

const SubscriptionPage = ({ data, onSubmit }) => {
    //console.log("Render SubscriptionPage " + data);

    const { user, setUser } = useUser();
    const commonText = appConfig[user.language]["common"];

    // Извлечение данных из data
    const { Title, PerMonth, PerYear, Items, Description } = data;

    const onSubmitSubscription = (buttonType) => {
        //console.log(`Button ${buttonType} was clicked`);
        setUser(prevUser => ({
            ...prevUser,
            subscriptionType: Title,
            subscriptionPerMonth: buttonType === "monthly" ? PerMonth : 0,
            subscriptionPerYear: buttonType === "monthly" ? 0 : PerYear,
            registrated: true,
        }));

        onSubmit({
            subscriptionType: Title,
            subscriptionPerMonth: buttonType === "monthly" ? PerMonth : 0,
            subscriptionPerYear: buttonType === "monthly" ? 0 : PerYear
        });
    };

    return (
        <View style={{
            flex: 1,
            // borderWidth: 1,
            // borderColor: "red"
        }} >
            <View style={[styles.container]}>
                <Text style={[inputStyles.titleText, styles.title]}>{Title}</Text>

                <Container topOffset={10}>
                    {PerMonth == 0 ? (
                        <Text style={[inputStyles.text, styles.font20, styles.pricing1]}>{`${PerMonth}$ / month`}</Text>
                    ) : (
                        <View style={styles.rowContainer}>
                            <Text style={[inputStyles.text, styles.font20, styles.pricing]}>{`${PerMonth}$ / month`}</Text>
                            <Text style={[inputStyles.text, styles.font20]}>or</Text>
                            <Text style={[inputStyles.text, styles.font20, styles.pricing]}>{`${PerYear}$ / year`}</Text>
                        </View>
                    )}
                </Container >

                <View style={styles.featuresContainer}>
                    {Object.entries(Items).map(([key, value], index) => (
                        <FeatureBox key={index} label={key} isChecked={value === 'true'} />
                    ))}
                </View>
                <Text style={[inputStyles.text, styles.description]}>{Description}</Text>
            </View >

            <View style={styles.submitFrame}>
                {PerMonth == 0 ? (
                    <View style={styles.submitButton} >
                        <SubmitButton
                            text={commonText["Select"]}
                            onSubmit={() => onSubmitSubscription("monthly")} />
                    </View>
                ) : (
                    <>
                        <View style={styles.submitButton} >
                            <SubmitButton
                                text={commonText["Select monthly"]}
                                onSubmit={() => onSubmitSubscription("monthly")} />
                        </View>
                        <View style={styles.submitButton} >
                            <SubmitButton
                                text={commonText["Select yearly"]}
                                onSubmit={() => onSubmitSubscription("yearly")} />
                        </View>
                    </>
                )}
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        width: width - 40,
        height: height - 260,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: designConstants.borderRadius,
        borderColor: colors.blueBell,
        borderWidth: designConstants.borderWidth,
        paddingHorizontal: designConstants.paddingHorizontal,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 28,
        textAlign: "center",
        paddingTop: 4,
        fontFamily: "Raleway-SemiBold",
        color: colors.darkSeaGreen,
    },
    pricing: {
        color: colors.blueBell,
        marginHorizontal: 10,
    },
    pricing1: {
        color: colors.blueBell,
        textAlign: "center"
    },
    font20: {
        fontSize: 20,
        fontFamily: "Raleway-SemiBold",
    },
    forecastType: {
        fontSize: 18,
        marginTop: 14,
        //fontWeight: "bold",
        //letterSpacing: 1,
    },
    featuresContainer: {
        marginTop: 10,
    },
    description: {
        marginTop: 16,
        flexWrap: 'wrap',
        textAlign: 'justify',
    },
    submitFrame: {
        left: 16,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderColor: "red",
        // borderWidth: 1,
        width: width - 30,
        height: 100
    },
    submitButton: {
        flex: 1, // Для равной широны
        marginHorizontal: 5, // Половина просвета между кнопками
    },
});

export default SubscriptionPage;