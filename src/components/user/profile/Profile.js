import React from 'react';

import ProfileForm from "./ProfileForm"
import Container from '../../common/Container';

import useBackHandler from '../../../hooks/useBackHandler';

export const ProfileScreenWrapper = ({ navigation }) => {
    const onSubmit = () => {
        navigation.navigate('Astrobots');
    }

    const onBack = () => {
        navigation.navigate('GreetingForm');
    }

    return <Profile onSubmit={onSubmit} onBack={ onBack } />;
};

const Profile = ({ onSubmit, onBack }) => {

    useBackHandler(onBack);
    
    return (
        <Container topOffset={0}>
            <ProfileForm onSubmit={onSubmit} />
        </Container>
    );
};

export default Profile;