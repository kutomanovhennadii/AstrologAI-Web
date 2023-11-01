import React from 'react';
import { useUser } from '../../context/UserContext';
import UserGate from './UserGate';
import Prediction from './prediction/Prediction';

const EntryPoint = () => {
    const { user } = useUser();

    return (
        <>
            {user.login === false && <UserGate />}
            {user.login === true && <Prediction />}
        </>
    );
};

export default EntryPoint;