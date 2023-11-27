import React, { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import UserGate from './UserGate';
import Prediction from '../prediction/Prediction';
import { sendUserToken } from '../../utils/sendUserToken'

const EntryPoint = () => {
    const { user, setUser } = useUser();

    useEffect(() => {
        const savedToken = localStorage.getItem('userToken');
        if (savedToken) {
            sendUserToken(savedToken).then(response => {
                setUser({ ...user, ...response });
            });
        } else {
            setUser({ ...user, isAuthenticated: false });
        }
    }, []);

    return (
        <>
            {user.isAuthenticated === false && <UserGate />}
            {user.isAuthenticated === true && <Prediction />}
        </>
    );
};

export default EntryPoint;