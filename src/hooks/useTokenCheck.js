import AsyncStorage from '@react-native-async-storage/async-storage';

import { useCallback, useState } from 'react';
import { useUser } from '../context/UserContext';
import { sendUserToken } from '../services/sendUserToken';

export const useTokenCheck = () => {
    const { setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const checkToken = useCallback(async () => {
        //console.log('Checking token...');
        setLoading(true);
        const savedToken = await AsyncStorage.getItem('userToken');
        console.log('Saved token:', savedToken);

        if (savedToken) {
            try {
                const response = await sendUserToken(savedToken);
                console.log('Response:', response);

                if (response.status === 200) {
                    setUser(prevUser => ({
                        ...prevUser,
                        ...response.data.user,
                        isAuthenticated: true
                    }));
                } else {
                    setUser(prevUser => ({
                        ...prevUser,
                        ...response.data.user,
                        isAuthenticated: false
                    }));
                }
            } catch (error) {
                console.error('Error during token verification:', error);
                setUser(prevUser => ({
                    ...prevUser,
                    ...response.data.user,
                    isAuthenticated: false
                }));
            }
        } else {
            //console.log('Token not found');
            setUser(prevUser => ({
                ...prevUser,
                isAuthenticated: false
            }));
            //console.log('Token not found');
        }
        setLoading(false);
    }, [setUser]);

    return { checkToken, loading }; // Возвращаем объект с функцией и флагом загрузки
};