import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { veryficateOnServer } from '../services/veryficateOnServer';
import { useUser } from '../context/UserContext';

export const useVerification = () => {
    const { user, setUser } = useUser(); // Предполагается, что useUser() — это хук контекста
    const [loading, setLoading] = useState(false);

    const verifyUser = useCallback(async ({ name, email, password, verification }) => {
        console.log("verifyUser", name, email, password, verification)
        try {
            setLoading(true);
            const response = await veryficateOnServer({
                name: name,
                email: email,
                password: password,
                verification: verification
            });
            console.log("verifyUser - response", response)
            if (response && response.data && response.status === 200) {
                await AsyncStorage.setItem('userToken', response.data.token);

                console.log("verifyUser - response.data.token", response.data.token)
                setUser(prevUser => ({
                    ...prevUser,
                    ...response.data.user,
                }));
                console.log("verifyUser - success: true")
                return { success: true };
            } else {
                return { success: false, error: response?.data?.error || 'Registration error' };
            }
        } catch (error) {
            return { success: false, status: 500, error: error.message || 'Registration error' };
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading]);

    return {
        verifyUser,
        loading
    };
};