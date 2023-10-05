// UserGateStack.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';
import Terms from './Terms'

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
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}