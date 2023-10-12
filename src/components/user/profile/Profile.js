import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileForm from "./ProfileForm"
import Container from '../../common/Container';

import appConfig from '../../../static/json/appConfig.json';

const imageContext = require.context('../../../static/image', true);

const Profile = () => {

    return (
        <Container topOffset={81}>
            <ProfileForm/>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    
});

export default Profile;