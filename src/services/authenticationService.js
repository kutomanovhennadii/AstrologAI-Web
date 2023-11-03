import axios from 'axios';
import { IS_TEST_MODE } from '../config/config'; // Убедитесь, что путь указан правильно

const BASE_URL = 'https://your-api-url.com'; // Замените на URL вашего API

export const authenticateOnServer = async ({ email, password }) => {
    if (IS_TEST_MODE) {
        // Имитация ответа сервера в тестовом режиме
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    user: {
                        email: email, // Предполагается, что email правильный
                        // Дополнительные данные пользователя могут быть здесь
                    },
                    token: 'fake-jwt-token'
                };
                resolve(mockResponse);
            }, 500); // Имитация задержки сети в полсекунды
        });
    } else {
        // Реальная логика аутентификации
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                email,
                password
            });

            if (response.data) {
                return response.data;
            }

            throw new Error('No data received');
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    }
};