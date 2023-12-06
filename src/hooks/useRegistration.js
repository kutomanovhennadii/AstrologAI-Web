import React, { useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUser } from '../context/UserContext';
import { registerOnServer } from '../services/registerOnServer';

export const useRegistration = () => {
    const { setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const registerUser = useCallback(async ({ name, email, password }) => {
        try {
            setLoading(true);
            const response = await registerOnServer({ name, email, password });

            if (response && response.data && response.status === 200) {
                await AsyncStorage.setItem('userToken', response.data.token);
                setUser(prevUser => ({
                    ...prevUser,
                    ...response.data.user,
                }));

                if (response.data.user.is_registration_completed) {
                    setUser(prevUser => ({
                        ...prevUser,
                        isAuthenticated: true
                    }));
                }
                return { success: true, status: 200 };
            } else if (response && response.data && response.status === 201) {
                return { success: true, status: 201 };
            } else {
                return { success: false, status: 400, error: response?.data?.error || 'Registration error' };
            }
        } catch (error) {
            return { success: false, status: 500, error: error.message || 'Registration error' };
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading]);

    return {
        registerUser, loading
    };
};