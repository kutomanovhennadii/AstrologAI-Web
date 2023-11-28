import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config'; // Убедитесь, что путь указан правильно

import { sendUserToken } from './sendUserToken';

export const authenticateOnServer = async ({ email, password }) => {
    try {
        let token;

        if (!IS_TEST_MODE) {
            // Реальная логика аутентификации
            const loginResponse = await axios.post(`${BASE_URL}/api/login`, { email, password });

            if (loginResponse.data) {
                token = loginResponse.data.token;
                localStorage.setItem('token', token);
            } else {
                throw new Error('No data received');
            }
        } else {
            // В тестовом режиме используем фейковый токен
            token = 'fake-token';
        }

        // Получение данных пользователя
        const userData = await sendUserToken(token);
        return { user: userData, token };

    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
};