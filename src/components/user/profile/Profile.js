import React, { useEffect, useState, useCallback } from 'react';

import ProfileForm from "./ProfileForm"
import Container from '../../common/Container';

const Profile = ({ onSubmit }) => {

    const onSubmitForm = (value) => {
        console.log(value);
        onSubmit();
        //navigation.navigate('SignUp');
    }

    return (
        <Container topOffset={0}>
            <ProfileForm onSubmit={onSubmitForm } />
        </Container>
    );
};

export default Profile;