import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import ProfileForm from "./ProfileForm"
import Container from '../common/Container';
import inputStyles from '../../styles/InputStyles';

import useBackHandler from '../../hooks/useBackHandler';

export const ProfileScreenWrapper = ({ navigation }) => {
    const onSubmit = () => {
        navigation.navigate('Astrobots');
    }

    const onBack = () => {
        navigation.navigate('GreetingForm');
    }

    return <Profile onSubmit={onSubmit} onBack={onBack} />;
};

const Profile = ({ onSubmit, onBack }) => {

    useBackHandler(onBack);

    return (
        <View style={[inputStyles.size100]}>
            <Container topOffset={0}>
                <ProfileForm onSubmit={onSubmit} />
            </Container>            
        </View>

    );
};

export default Profile;