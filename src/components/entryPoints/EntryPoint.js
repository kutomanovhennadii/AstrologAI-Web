import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUser } from '../../context/UserContext';
import UserGate from './UserGate';
import Prediction from '../prediction/Prediction';
import { sendUserToken } from '../../services/sendUserToken'
import initializeDatabase from '../../database/databaseSetup';
import { useTokenCheck } from '../../hooks/useTokenCheck';
import StartPage from './StartPage';

const EntryPoint = () => {
    const { user } = useUser();
    const { checkToken, loading } = useTokenCheck();

    useEffect(() => {
        initializeDatabase();
    }, []);

    useEffect(() => {
        checkToken();
    }, []);

    if (loading) {
        return <StartPage />;
    }

    return (
        <>
            {user.isAuthenticated === false && <UserGate />}
            {user.isAuthenticated === true && <Prediction />}
        </>
    );
};

export default EntryPoint;