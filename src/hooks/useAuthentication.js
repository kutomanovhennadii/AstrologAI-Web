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
            const data = await authenticateOnServer({ email, password });
            setLoading(false);

            //console.log("authenticateUser data = ", data)
            if ((data && data.token) && (user.email === email) && (user.password === password)) {
                setUser(prevUser => ({
                    ...prevUser,
                    isAuthenticated: true,
                    token: data.token
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