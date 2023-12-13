import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IS_TEST_MODE, BASE_URL } from '../config/config'; // Убедитесь, что путь указан правильно
import { sendUserToken } from './sendUserToken';

export const authenticateOnServer = async ({ username, password }) => {
    try {
        let serverResponse;

        if (!IS_TEST_MODE) {
            const endpoint = '/api/login/'; // Укажите здесь конечную точку для отправки токена
            const url = `${BASE_URL}${endpoint}`;
            console.log('authenticateOnServer URL:', url);
            console.log('authenticateOnServer username:', username);
            //console.log('authenticateOnServer Password:', password);

            // Реальная логика аутентификации
            const serverResponse = await axios.post(url, { username, password }, {
                validateStatus: function (status) {
                    return status < 500; // Резолвит промис для всех статусов меньше 500
                }
            });
            console.log('authenticateOnServer response:', serverResponse);
            console.log('authenticateOnServer response data:', serverResponse.data);
            console.log('authenticateOnServer response data.data.error:', serverResponse.data.data.error);
            console.log('authenticateOnServer response.status:', serverResponse.status);

            // Проверка, есть ли ошибка аутентификации
            if (serverResponse.status === 400) {
                // Возвращаем ошибку, не выбрасываем исключение
                console.log('authenticateOnServer Error:', serverResponse.data.data.error);
                return serverResponse.data;
            }

            if (!serverResponse.data) {
                throw new Error('No data received');
            }

            response = serverResponse.data;

        } else {
            // В тестовом режиме используем фейковые данные
            response = {
                data: {
                    token: 'fake-token',
                    user: {
                        is_registration_completed: true,
                        astrobot: "Bruce",
                        language: 'Русский',
                        generalContent: true,
                        businessContent: true,
                        relationContent: true,
                        healthContent: false,
                        name: "hkutomanov",
                        aspectsContent: false,
                        gender: "male",
                        birth_date: "1966-09-04",
                        birth_time: "00:53:28",
                        birth_country: "Ukraine",
                        birth_city: "Kharkov",
                        biography: '',
                        subscriptionType: 'Premium',
                        subscriptionPerMonth: 0,
                        subscriptionPerYear: 0,
                    },
                },
            };
        }

        // Возвращаем данные пользователя и токен
        return response.data;

    } catch (error) {
        console.error('Authentication error:', error);
        return {
            status: 500,
            data: { error: error.message }
        };
    }
};