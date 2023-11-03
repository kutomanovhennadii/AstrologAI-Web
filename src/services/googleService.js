import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import { IS_TEST_MODE } from '../config/config';


export async function googleService() {
    try {
        if (IS_TEST_MODE) {
            // Имитация задержки
            await new Promise(resolve => setTimeout(resolve, 500));

            // Моковые данные
            const userData = {
                name: 'Mock User',
                email: 'mockemail@example.com'
            };
            const mockToken = 'mock_access_token';
            return { userData, token: mockToken };
        } else {
            // Реальная логика запроса к Google
            const { type, authentication } = await Google.useAuthRequest({
                expoClientId: 'YOUR_EXPO_CLIENT_ID',
                iosClientId: 'YOUR_IOS_CLIENT_ID',
                androidClientId: 'YOUR_ANDROID_CLIENT_ID',
                webClientId: 'YOUR_WEB_CLIENT_ID',
                responseType: ResponseType.Token,
            });

            if (type === 'success') {
                const { idToken, accessToken } = authentication;
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });
                const userDataResponse = await userInfoResponse.json();
                const { email, name } = userDataResponse;
                const userData = {
                    name: name,
                    email: email
                };
                return { userData, token: idToken };
            } else {
                throw new Error('Google Sign-In was cancelled');
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
}





