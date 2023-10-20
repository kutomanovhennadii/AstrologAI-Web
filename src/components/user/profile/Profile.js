import React, { useEffect, useState, useCallback } from 'react';
import ProfileForm from "./ProfileForm"
import Container from '../../common/Container';

const Profile = () => {

    return (
        <Container topOffset={0}>
            <ProfileForm />
        </Container>
    );
};

export default Profile;