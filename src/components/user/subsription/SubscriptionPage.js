import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Dimensions } from 'react-native';

import FeatureBox from '../../common/FeatureBox';
import Container from '../../common/Container';
import SubmitButton from '../../common/SubmitButton';

const { width, height } = Dimensions.get('window');

const SubscriptionPage = ({ data }) => {
    console.log("Render SubscriptionPage " + data);

    // Извлечение данных из data
    const { Title, PerMonth, PerYear, Items, Description } = data;

    const navigateToNextPage = () => {
        console.log("Навигация на следующую страницу");
    };

    return (
        <>
            <View style={styles.container}>
                <Container topOffset={4}>
                    <Text style={styles.premium}>{Title}</Text>
                </Container>

                <Container topOffset={18}>

                    {PerMonth == 0 ? (
                        <Text style={styles.pricing1}>{`${PerMonth}$ / month`}</Text>
                    ) : (

                        <View style={styles.rowContainer}>
                            <Text style={styles.pricing}>{`${PerMonth}$ / month`}</Text>
                            <Text style={styles.or}>or</Text>
                            <Text style={styles.pricing}>{`${PerYear}$ / year`}</Text>
                        </View>

                    )}

                </Container >

                <Text style={styles.forecastType}>Forecast type</Text>
                <View style={styles.featuresContainer}>
                    {Object.entries(Items).map(([key, value], index) => (
                        <FeatureBox key={index} label={key} isChecked={value === 'true'} />
                    ))}
                </View>
                <Text style={styles.description}>{Description}</Text>
            </View >

            <View style={styles.submitFrame}>
                {PerMonth == 0 ? (
                    <View style={styles.submitButton} >
                        <SubmitButton text="Select" onSubmit={navigateToNextPage} />
                    </View>
                ) : (
                    <>
                        <View style={styles.submitButton} >
                            <SubmitButton text="Select monthly" onSubmit={navigateToNextPage} />
                        </View>
                        <View style={styles.submitButton} >
                            <SubmitButton text="Select yearly" onSubmit={navigateToNextPage} />
                        </View>
                    </>


                )}





            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 16,
        borderStyle: "solid",
        borderColor: "#1877f2",
        borderWidth: 2,
        flex: 1,
        width: width - 40,
        height: height - 250,
        overflow: "hidden",
        marginHorizontal: 20,
        marginTop: 100,
        marginBottom: 120,
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // если нужно разделить пространство между элементами

    },
    premium: {
        fontSize: 28,
        color: "#fff",
        fontWeight: "600",
        textAlign: "center"
    },
    pricing: {
        fontSize: 20,
        color: "#1877f2",
        fontWeight: "600",
        marginHorizontal: 10,
    },
    pricing1: {
        fontSize: 20,
        color: "#1877f2",
        fontWeight: "600",
        //marginHorizontal: 10,
        textAlign: "center"
    },

    or: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "600",
        //width: 150, // установить фиксированную ширину
        //marginHorizontal: 30,
    },
    forecastType: {
        fontSize: 18,
        marginTop: 16,
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    featuresContainer: {
        marginTop: 16,
    },
    description: {
        marginTop: 16,
        fontSize: 16,
        color: "#fff",
        flexWrap: 'wrap',
    },
    submitFrame: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    submitButton: {
        flex: 1, // Для равной широны
        marginHorizontal: 2.5, // Половина просвета между кнопками
    },
});

export default SubscriptionPage;