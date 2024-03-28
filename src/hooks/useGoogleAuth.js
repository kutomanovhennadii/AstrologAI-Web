import { useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import google_client_config from '../static/json/google_client_config.json';
import { IS_TEST_MODE } from '../config/config';

export const useGoogleAuth = () => {
    const [authResponse, setAuthResponse] = useState(null);

    // Если мы находимся в режиме тестирования, возвращаем фейковый ответ
    if (IS_TEST_MODE) {
        const mockAuth = () => {
            return new Promise(resolve => setTimeout(() => {
                resolve({
                    status: 200,
                    data: { token: 'mock_access_token' },
                });
            }, 500));
        };
        return { initiateGoogleAuth: mockAuth, authResponse };
    }

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: google_client_config.installed.client_id,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            setAuthResponse({
                status: 200,
                data: { token: response.params.idToken },
            });
        } else if (response?.type === 'cancel') {
            console.log('Google Sign-In was cancelled');
        }
    }, [response]);

    const initiateGoogleAuth = () => {
        if (request) {
            promptAsync();
        }
    };

    return { initiateGoogleAuth, authResponse };
};