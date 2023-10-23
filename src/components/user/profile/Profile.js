import React, { useEffect, useState, useCallback } from 'react';
import ProfileForm from "./ProfileForm"
import Container from '../../common/Container';

const Profile = (navigation) => {
    const onSubmit = (value) => {
        console.log(value);
        //navigation.navigate('SignUp');
    }

    return (
        <Container topOffset={0}>
            <ProfileForm onSubmit={onSubmit } />
        </Container>
    );
};

export default Profile;