import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCallback, useState } from 'react';
import { useUser } from '../context/UserContext';
import { sendUserToken } from '../services/sendUserToken';

export const useTokenCheck = () => {
    const { setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const checkToken = useCallback(async () => {
        setLoading(true);
        const savedToken = await AsyncStorage.getItem('userToken');
        console.log('Saved token:', savedToken);

        if (savedToken) {
            try {
                const response = await sendUserToken(savedToken);

                if (response.status === 200) {
                    setUser({
                        ...response.data,
                        isAuthenticated: true
                    });
                } else {
                    setUser({
                        ...response.data,
                        isAuthenticated: false
                    });
                }
            } catch (error) {
                console.error('Error during token verification:', error);
                setUser({
                    ...response.data,
                    isAuthenticated: false
                });
            }
        } else {
            setUser({
                ...response.data,
                isAuthenticated: false
            });
        }
        setLoading(false);
    }, [setUser]);

    return { checkToken, loading };
};