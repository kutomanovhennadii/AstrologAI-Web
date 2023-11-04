import axios from 'axios';
import { IS_TEST_MODE } from '../config/config'; // Проверьте, что путь указан правильно

const BASE_URL = 'https://your-api-url.com'; // Замените на URL вашего API

export const sendAstrobotToServer = async (astrobot) => {
    if (IS_TEST_MODE) {
        // Имитация ответа сервера в тестовом режиме
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    status: 'success',
                    astrobot: astrobot,
                    message: 'Profile data is saved in test mode'
                };
                resolve(mockResponse);
            }, 500); // Имитация задержки сети в полсекунды
        });
    } else {
        // Реальная логика отправки данных профиля
        try {
            const response = await axios.post(`${BASE_URL}/astrobot`, astrobot);

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