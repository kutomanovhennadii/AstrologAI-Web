// import * as AuthSession from 'expo-auth-session';

import * as AuthSession from 'expo-auth-session';

import google_client_config from '../static/json/google_client_config.json';
import { IS_TEST_MODE } from '../config/config';

export const googleService = async () => {
    console.log('googleService IS_TEST_MODE', IS_TEST_MODE);
    if (IS_TEST_MODE) {
        // Фейковый ответ для тестового режима
        return new Promise(resolve => setTimeout(() => {
            resolve({
                status: 200,
                data: { token: 'mock_access_token' }
            });
        }, 500));
    }

    try {
        // Параметры для Google OAuth
        console.log('googleService google_client_config', google_client_config);
        const config = {
            responseType: 'token',
            clientId: google_client_config.installed.client_id,
            scopes: ['profile', 'email'],
            redirectUri: AuthSession.makeRedirectUri({
                scheme: 'astrologAI',
                useProxy: true, // если вы тестируете на реальном устройстве
            }),
        };
        console.log('googleService config', config);

        const request = new AuthSession.AuthRequest(config);
        console.log('googleService request', request);

        const discovery = {
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenEndpoint: 'https://oauth2.googleapis.com/token',
        };

        console.log('googleService discovery', discovery);

        // Получение URL для авторизации
        const url = await request.makeAuthUrlAsync(discovery);
        console.log('googleService url', url);

        // Открытие запроса авторизации
        const result = await request.promptAsync(discovery);
        console.log('googleService result', result);

        // // Анализ возвращаемого URL
        // const parsed = await request.parseReturnUrlAsync("<URL From Server>");
        // console.log('googleService parsed', parsed);

        if (result.type === 'success') {
            return {
                status: 200,
                data: { token: result.params.access_token },
            };
        } else {
            return { status: 500, data: { error: 'Google Sign-In was cancelled' } };
        }
    } catch (error) {
        console.log('googleService error', error);
        return {
            status: 500,
            data: { error: error.message }
        };
    }
};

