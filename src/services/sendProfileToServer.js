import axios from 'axios';
import { IS_TEST_MODE } from '../config/config'; // Проверьте, что путь указан правильно

const BASE_URL = 'https://your-api-url.com'; // Замените на URL вашего API

export const sendProfileToServer = async (profile) => {
    if (IS_TEST_MODE) {
        // Имитация ответа сервера в тестовом режиме
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    status: 'success',
                    profile: profile,
                    message: 'Profile data is saved in test mode'
                };
                resolve(mockResponse);
            }, 500); // Имитация задержки сети в полсекунды
        });
    } else {
        // Реальная логика отправки данных профиля
        try {
            const response = await axios.post(`${BASE_URL}/profile`, profile);

            if (response.data) {
                return response.data;
            }

            throw new Error('No data received');
        } catch (error) {
            console.error('Error sending profile:', error);
            throw error;
        }
    }
};