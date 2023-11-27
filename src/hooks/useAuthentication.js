import React, { useState, useCallback } from "react";
import { useUser } from '../context/UserContext';
import { authenticateOnServer } from '../services/authenticationService';

export const useAuthentication = () => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const authenticateUser = useCallback(async ({ email, password }) => {
        //console.log(`Email: ${email}`);
        //console.log(`Password: ${password}`);

        try {
            setLoading(true);
            const response = await authenticateOnServer({ email, password });
            setLoading(false);

            //console.log("authenticateUser data = ", data)
            if (response && response.token) {
                localStorage.setItem('userToken', response.token);

                setUser(prevUser => ({
                    ...prevUser,
                    ...response,
                    userToken: response.token
                }));
                return true;
            } else {
                //console.log('Bad auth')
                // Здесь можно обработать ситуацию, когда аутентификация не успешна
                return false;
            }
        } catch (error) {
            // Здесь можно обработать ошибку при аутентификации
            //console.error(error);
            return false;
        }
    }, [setUser, setLoading]);

    return {
        authenticateUser, loading
    };
};