import { appleAuth } from '@invertase/react-native-apple-authentication';

import { IS_TEST_MODE } from '../config/config'; // Путь к вашему конфигурационному файлу

export async function appleService() {
    // console.log('appleService');
    try {
        if (IS_TEST_MODE) {
            // Возвращение фейкового токена для тестового режима
            return new Promise(resolve => setTimeout(() => {
                resolve({
                    status: 200,
                    data: {
                        token: 'mock_apple_access_token'
                    }
                });
            }, 500));
        } else {
            // Реальная логика аутентификации через Apple
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

            if (credentialState === appleAuth.State.AUTHORIZED) {
                // Пользователь успешно авторизован
                return {
                    status: 200,
                    data: {
                        token: appleAuthRequestResponse.identityToken
                    }
                };
            } else {
                // Аутентификация была отменена пользователем или произошла ошибка
                return { status: 500, data: { error: 'Apple Sign-In was cancelled or failed' } };
            }
        }
    } catch (error) {
        return {
            status: 500,
            data: { error: error.message }
        };
    }
}