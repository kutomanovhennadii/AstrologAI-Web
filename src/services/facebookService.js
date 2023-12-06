import * as Facebook from 'expo-facebook';
import { IS_TEST_MODE } from '../config/config';

export async function facebookService() {
    try {
        if (IS_TEST_MODE) {
            return new Promise(resolve => setTimeout(() => {
                resolve({
                    status: 200,
                    data: {
                        token: 'mock_access_token'
                    }
                });
            }, 1000));
        } else {
            await Facebook.initializeAsync({
                appId: 'YOUR_FACEBOOK_APP_ID', // Замените на свой App ID
            });
            const result = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });

            if (result.type === 'success') {
                return {
                    status: 200,
                    data: {
                        token: result.token
                    }
                };
            } else if (result.type === 'cancel') {
                return { status: 400, data: { cancelled: true } };
            } else {
                return { status: 500, data: { error: 'Something went wrong obtaining the access token' } };
            }
        }
    } catch (error) {
        return {
            status: 500,
            data: { error: error.message }
        };
    }
}