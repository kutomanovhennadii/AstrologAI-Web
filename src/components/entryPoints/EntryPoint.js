import React from 'react';
import { useUser } from '../../context/UserContext';
import UserGate from './UserGate';
import Prediction from '../prediction/Prediction';

const EntryPoint = () => {
    const { user } = useUser();

    return (
        <>
            {user.isAuthenticated === false && <UserGate />}
            {user.isAuthenticated === true && <Prediction />}
        </>
    );
};

export default EntryPoint;