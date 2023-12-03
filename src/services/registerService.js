import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://yourserver.com'; // замените на URL вашего сервера
const IS_TEST_MODE = false; // или true, если вы в тестовом режиме

export const registerOnServer = async ({ name, email, password }) => {
    try {
        if (IS_TEST_MODE) {
            // Возвращаем фейковый ответ в тестовом режиме
            return {
                status: 201,
                data: {
                    message: 'User registered successfully. Please check your email for the verification code.',
                    // Добавьте здесь любые другие фейковые данные, если необходимо
                }
            };
        } else {
            // Реальный запрос к серверу
            const response = await axios.post(`${BASE_URL}/api/register`, { name, email, password });
            return response;
        }
    } catch (error) {
        // Возвращаем объект ошибки для обработки в вышележащей функции
        return error.response;
    }
};