import { useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import { googleService } from '../services/googleService';
import { authenticateSocialOnServer } from '../services/authenticateSocialOnServer';

export const useGoogleAuthentication = () => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const authenticateGoogleUser = useCallback(async () => {

        setLoading(true);
        try {
            const { idToken, accessToken } = await googleService();

            // Проверка токена idToken с вашим сервером
            setLoading(true);
            const serverResponse = await authenticateSocialOnServer({ idToken });
            setLoading(true);

            if (serverResponse && serverResponse.token) {
                // Сохранение данных пользователя и токена аутентификации
                setUser({
                    ...user,
                    isAuthenticated: true,
                    token: serverResponse.token
                });
                return true;
            } else {
                // Обработка ситуации, когда аутентификация не удалась
                return false;
            }
        } catch (error) {
            console.error('Authentication error: ', error);
            return false;
        } finally {
            setLoading(false);
        }
    }, [setUser]);

    return {
        authenticateGoogleUser,
        loading
    };
};
