import { useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';

import { authenticateSocialOnServer } from '../services/authenticateSocialOnServer';

export const useSocialAuthentication = (authenticationService) => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const authenticateUser = useCallback(async () => {
        setLoading(true);
        try {
            const { token, userData } = await authenticationService();

            // Проверка токена с вашим сервером
            const serverResponse = await authenticateSocialOnServer({
                token,
                email: userData.email
            });

            if (serverResponse && serverResponse.token) {
                // Сохранение данных пользователя и токена аутентификации
                setUser({
                    ...user,
                    isAuthenticated: true,
                    token: serverResponse.token,
                    email: userData.email,
                    name: userData.name
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
    }, [authenticationService, setUser]);

    return {
        authenticateUser,
        loading
    };
};