import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IS_TEST_MODE, BASE_URL } from '../config/config';

export const registerOnServer = async ({ name, email, password }) => {
    try {
        if (IS_TEST_MODE) {
            // Возвращаем фейковый ответ в тестовом режиме
            return new Promise(resolve => setTimeout(() => {
                resolve({
                    status: 201,
                    data: {
                        message: 'User registered successfully. Please check your email for the verification code.',
                        user: {
                            name: name,
                            email: email,
                            password: password,
                        }
                    }
                });
            }, 500));

        } else {
            const endpoint = '/api/register/'; // Укажите здесь конечную точку для отправки токена
            const url = `${BASE_URL}${endpoint}`;
            console.log('authenticateOnServer URL:', url);

            // Реальный запрос к серверу
            console.log('registerOnServer name:', name);

            const response = await axios.post(url, { name, email, password }, {
                validateStatus: function (status) {
                    return status < 600; // Резолвит промис для всех статусов меньше 500
                }
            });

            console.log('registerOnServer response.data.data:', response.data.data);
            return {
                status: response.status,
                data: response.data.data
            };
        }
    } catch (error) {
        console.log('registerOnServer error:', error);
        return {
            status: 500,
            data: { error: error.message }
        };
    }
};