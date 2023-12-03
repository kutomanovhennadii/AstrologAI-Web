import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IS_TEST_MODE, BASE_URL } from '../config/config'; // Убедитесь, что путь указан правильно
import { sendUserToken } from './sendUserToken';

export const authenticateOnServer = async ({ email, password }) => {
    try {
        let response;

        if (!IS_TEST_MODE) {
            // Реальная логика аутентификации
            response = await axios.post(`${BASE_URL}/api/login`, { email, password });

            // Проверка, есть ли ошибка аутентификации
            if (response.status === 400) {
                // Возвращаем ошибку, не выбрасываем исключение
                return { error: response.data.error };
            }

            if (!response.data) {
                throw new Error('No data received');
            }

            // Сохраняем токен в AsyncStorage
            await AsyncStorage.setItem('userToken', response.data.token);
        } else {
            // В тестовом режиме используем фейковые данные
            response = {
                data: {
                    token: 'fake-token',
                    user: {
                        registrated: true,
                        astrobot: "Bruce",
                        language: 'Русский',
                        generalContent: true,
                        businessContent: true,
                        relationContent: true,
                        healthContent: false,
                        name: "hkutomanov",
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
                },
            };
        }

        // Возвращаем данные пользователя и токен
        return response;

    } catch (error) {
        console.error('Authentication error:', error);
        throw error;
    }
};