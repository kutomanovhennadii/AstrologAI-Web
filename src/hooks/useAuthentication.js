import React, { useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUser } from '../context/UserContext';
import { authenticateOnServer } from '../services/authenticationService';

export const useAuthentication = () => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const authenticateUser = useCallback(async ({ username, password }) => {
        try {
            setLoading(true);

            const response = await authenticateOnServer({ username, password });
            console.log('authenticateUser Response:', response);
            console.log('authenticateUser Response.data:', response.data);
           

            if (response && response.token) {
                await AsyncStorage.setItem('userToken', response.token);
                console.log('authenticateUser Response.user:', response.user);
                
                setUser(prevUser => ({
                    ...prevUser,
                    ...response.user,
                }));
                console.log('authenticateUser response.user.is_registration_completed', response.user.is_registration_completed);

                if (response.user.is_registration_completed) {
                    console.log('authenticateUser set isAuthenticated true');
                    setUser(prevUser => ({
                        ...prevUser,
                        isAuthenticated: true
                    }));
                }
                //console.log('authenticateUser 3');
                return { success: true };
            } else {
                // Возвращаем информацию об ошибке аутентификации
                return { success: false, error: response.data.error };
            }
        } catch (error) {
            setLoading(false);
            console.log('authenticateUser error:', error);
            // Возвращаем информацию об ошибке
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading]);

    return {
        authenticateUser, loading
    };
};