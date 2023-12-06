import * as Google from 'expo-auth-session/providers/google';
import { ResponseType } from 'expo-auth-session';
import * as AuthSession from 'expo-auth-session';

import { IS_TEST_MODE } from '../config/config';
import googleClientConfig from '../static/json/googleClientConfig.json';

export async function googleService() {
    try {
        if (IS_TEST_MODE) {
            return new Promise(resolve => setTimeout(() => {
                resolve({
                    status: 200,
                    data: {
                        token: 'mock_access_token'
                    }
                });
            }, 500));
        } else {
            const authConfig = {
                androidClientId: googleClientConfig.installed.client_id,
                responseType: AuthSession.ResponseType.Token,
            };

            const result = await AuthSession.startAsync({
                authUrl: AuthSession.makeAuthUrl({
                    ...authConfig,
                    useProxy: true,
                    scopes: ['openid', 'profile', 'email']
                }),
            });

            if (result.type === 'success') {
                return {
                    status: 200,
                    data: {
                        token: result.params.idToken
                    }
                };
            } else {
                return { status: 500, data: { error: 'Google Sign-In was cancelled' } };
            }
        }
    } catch (error) {
        return {
            status: 500,
            data: { error: error.message }
        };
    }
}





