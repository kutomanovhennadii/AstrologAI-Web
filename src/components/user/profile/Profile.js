import React from 'react';

import ProfileForm from "./ProfileForm"
import Container from '../../common/Container';

export const ProfileScreenWrapper = ({ navigation }) => {
    const onSubmitProfile = () => {
        navigation.navigate('Astrobots');
    }

    return <Profile onSubmit={onSubmitProfile} />;
};

const Profile = ({ onSubmit }) => {
    return (
        <Container topOffset={0}>
            <ProfileForm onSubmit={onSubmit} />
        </Container>
    );
};

export default Profile;