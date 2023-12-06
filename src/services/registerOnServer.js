import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IS_TEST_MODE, BASE_URL } from '../config/config';

export const registerOnServer = async ({ name, email, password }) => {
    try {
        if (IS_TEST_MODE) {
            // Возвращаем фейковый ответ в тестовом режиме
            return {
                status: 201,
                data: {
                    message: 'User registered successfully. Please check your email for the verification code.',
                    user: {
                        name: name,
                        email: email,
                        password: password,
                    }
                }
            };
        } else {
            // Реальный запрос к серверу
            const response = await axios.post(`${BASE_URL}/api/register`, { name, email, password });
            return response;
        }
    } catch (error) {
        return {
            status: 500,
            data: { error: error.message }
        };
    }
};