import axios from 'axios';
import { IS_TEST_MODE } from '../config/config'; // Убедитесь, что путь указан правильно

const BASE_URL = 'https://your-api-url.com'; // Замените на URL вашего API

export const veryficateOnServer = async ({ name, email, password }) => {
    if (IS_TEST_MODE) {
        // Имитация ответа сервера в тестовом режиме
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    verificationCode: '1234' // Имитация верификационного кода
                };
                resolve(mockResponse);
            }, 500); // Имитация задержки сети в полсекунды
        });
    } else {
        // Реальная логика верификации
        try {
            const response = await axios.post(`${BASE_URL}/verify`, {
                name,
                email,
                password
            });

            if (response.data && response.data.verificationCode && response.data.verificationCode.length === 4) {
                return response.data.verificationCode;
            }

            throw new Error('Invalid verification code received');
        } catch (error) {
            console.error('Verification error:', error);
            throw error;
        }
    }
};