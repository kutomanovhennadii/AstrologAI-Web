import React, { useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUser } from '../context/UserContext';
import { authenticateOnServer } from '../services/authenticationService';

export const useAuthentication = () => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const authenticateUser = useCallback(async ({ email, password }) => {
        try {
            setLoading(true);
            const response = await authenticateOnServer({ email, password });
            console.log('Response:', response);

            if (response && response.data && response.data.token) {
                await AsyncStorage.setItem('userToken', response.data.token);

                setUser(prevUser => ({
                    ...prevUser,
                    ...response.data.user,
                    isAuthenticated: true,
                }));

                return { success: true };
            } else {
                // Возвращаем информацию об ошибке аутентификации
                return { success: false, error: response.data.error };
            }
        } catch (error) {
            setLoading(false);
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