import * as Facebook from 'expo-facebook';
import { IS_TEST_MODE } from '../config/config';

export async function facebookService() {
    try {
        if (IS_TEST_MODE) {
            // Имитация задержки и возвращение моковых данных
            await new Promise(resolve => setTimeout(resolve, 1000));
            const userData = {
                name: 'Mock User',
                email: 'mockemail@example.com'
            };
            return { token: 'mock_access_token', userData };
        } else {
            // Инициализация и запрос на вход через Facebook
            await Facebook.initializeAsync({
                appId: 'YOUR_FACEBOOK_APP_ID', // Замените на свой App ID
            });
            const result = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });

            if (result.type === 'success') {
                // Получаем токен доступа и данные пользователя
                const response = await fetch(`https://graph.facebook.com/me?fields=name,email&access_token=${result.token}`);
                const userData = await response.json();
                return { token: result.token, userData: { name: userData.name, email: userData.email } };
            } else if (result.type === 'cancel') {
                // Обработка отмены пользователем
                return { cancelled: true };
            } else {
                throw new Error('Something went wrong obtaining the access token');
            }
        }
    } catch (error) {
        // Логгирование ошибки
        console.error(error);
        throw error;
    }
}