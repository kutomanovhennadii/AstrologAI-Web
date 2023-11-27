import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config'; // Убедитесь, что путь указан правильно

export const authenticateOnServer = async ({ email, password }) => {
    if (IS_TEST_MODE) {
        // Имитация ответа сервера в тестовом режиме
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockResponse = {
                    user: {
                        isAuthenticated: true,
                        registrated: true,
                        astrobot: "Bruce",
                        language: 'Русский',
                        generalContent: true,
                        businessContent: true,
                        relationContent: true,
                        healthContent: false,
                        aspectsContent: false,
                        gender: "male",
                        birthDate: "1966-09-04",
                        birthTime: "00:53:28",
                        birthCountry: "Ukraine",
                        birthCity: "Kharkov",
                        biography: '',
                        subsciptionType: 'Premium',
                        subsciptionPerMonth: 0,
                        subscriptionPerYear: 0,
                    },
                    token: 'fake-jwt-token'
                };
                resolve(mockResponse);
            }, 500); // Имитация задержки сети в полсекунды
        });
    } else {
        // Реальная логика аутентификации
        try {
            const response = await axios.post(`${BASE_URL}/api/login`, {
                email,
                password
            }).then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);

                // Запрос данных пользователя
                axios.get(`${BASE_URL}/api/user_data`, { headers: { "Authorization": `Bearer ${token}` } })
                    .then(response => {
                        // Обработка данных пользователя
                    });

                // Запрос контента
                axios.get(`${BASE_URL}/api/content_data`, { headers: { "Authorization": `Bearer ${token}` } })
                    .then(response => {
                        // Обработка контента
                    });
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