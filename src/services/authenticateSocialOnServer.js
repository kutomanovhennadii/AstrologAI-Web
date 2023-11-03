import axios from 'axios';
import { IS_TEST_MODE } from '../config/config'; // Убедитесь, что путь указан правильно

export async function authenticateSocialOnServer(idToken, email) {
    if (IS_TEST_MODE) {
        // Логика для тестового режима
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    user: {
                        email: email
                    },
                    token: 'fake-jwt-token'
                };

                resolve(mockResponse);
            }, 500); // Имитация задержки сети в полсекунды
        });
    } else {
        // Реальная логика для работы с сервером
        try {
            const response = await axios.post('https://your-server.com/auth/google', {
                idToken,
                email
            });

            return response.data;
        } catch (error) {
            console.error('Error during server authentication:', error);
            throw error.response || error;
        }
    }
}