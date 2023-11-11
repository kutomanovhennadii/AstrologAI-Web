// UserGateStack.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import SignIn from '../signin/SignIn';
import SignUp from '../signup/SignUp';
import Terms from '../terms/Terms'
import Verification from '../verification/Verification'
import GreetingForm from '../greeting/GreetingForm'
import Container from '../common/Container';
import AstrologAIText from '../common/AstrologAIText';
import { ProfileScreenWrapper } from '../profile/Profile';
import { AstrobotScreenWrapper } from '../astrobots/Astrobots'
import { SubscriptionScreenWrapper } from '../subcsription/Subscription'

import inputStyles from '../../styles/InputStyles';

const Stack = createStackNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent'
    },
};


export default function UserGate() {

    return (
        <NavigationContainer theme={MyTheme}>
            <Container topOffset={0}>
                <View style={inputStyles.scaledLogo}>
                    <AstrologAIText />
                </View>
            </Container>
            <Stack.Navigator initialRouteName="SignIn">
                {/* <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Terms"
                    component={Terms}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Verification"
                    component={Verification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreenWrapper}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Astrobots"
                    component={AstrobotScreenWrapper}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Subscription"
                    component={SubscriptionScreenWrapper}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="GreetingForm"
                    component={GreetingForm}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}