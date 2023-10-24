// UserGateStack.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import Astrobots from './astrobots/Astrobots';
import Profile from './profile/Profile';
import Terms from './Terms'
import Verification from './verification/Verification'
import GreetingForm from './greeting/GreetingForm'
import Container from '../common/Container';
import AstrologAIText from '../common/AstrologAIText';
import MainFrame from '../common/MainFrame';

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
            <MainFrame>
                <Stack.Navigator initialRouteName="Profile">
                    {/* <Stack.Screen
                        name="Astrobots"
                        component={Astrobots}
                        options={{ headerShown: false }} /> */}
                    <Stack.Screen
                        name="Profile"
                        component={Profile}
                        options={{ headerShown: false }} />
                    {/* <Stack.Screen 
                        name="Terms" 
                        component={Terms} 
                        options={{ headerShown: false }} /> */}
                    {/* <Stack.Screen 
                        name="Verification" 
                        component={Verification} 
                        options={{ headerShown: false }} /> */}
                    {/* <Stack.Screen 
                        name="GreetingForm" 
                        component={GreetingForm} 
                        options={{ headerShown: false }} /> */}
                </Stack.Navigator>
            </MainFrame>

        </NavigationContainer>
    );
}