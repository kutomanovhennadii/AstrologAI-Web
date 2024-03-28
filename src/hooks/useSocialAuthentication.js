import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUser } from '../context/UserContext';

import { googleService } from '../services/googleService';
import { facebookService } from '../services/facebookService';
import { appleService } from '../services/appleService';
import { authenticateSocialOnServer } from '../services/authenticateSocialOnServer';

export const useSocialAuthentication = () => {
    const { setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const authenticateSocial = useCallback(async (socialNetwork) => {
        setLoading(true);
        try {
            console.log('authenticateSocial socialNetwork', socialNetwork);

            let responseSocial;
            if (socialNetwork === 'google') {
                console.log('authenticateSocial googleService');
                responseSocial = await googleService();
                console.log('authenticateSocial responseSocial', responseSocial);
            } else if (socialNetwork === 'facebook') {
                responseSocial = await facebookService();
            } else if (socialNetwork === 'apple') {
                responseSocial = await appleService();
            } else {
                throw new Error('Unsupported social network');
            }
            console.log('authenticateSocial responseSocial', responseSocial);

            if (responseSocial && responseSocial.status == 200) {
                console.log('authenticateSocial responseSocial.data.token', responseSocial.data.token);
                const responseServer = await authenticateSocialOnServer({
                    socialNetwork: socialNetwork,
                    token: responseSocial.data.token
                });
                console.log('authenticateSocial responseServer', responseServer);

                if (responseServer && responseServer.data && responseServer.status === 200) {
                    await AsyncStorage.setItem('userToken', responseServer.data.token);

                    setUser(prevUser => ({
                        ...prevUser,
                        ...responseServer.data.user,
                    }));

                    if (responseServer.data.user.is_registration_completed) {
                        setUser(prevUser => ({
                            ...prevUser,
                            isAuthenticated: true
                        }));
                    }
                    // console.log('authenticateSocial success : true');
                    return { success: true };
                } else {
                    return { success: false, error: responseServer?.data?.error || 'Authentication error' };
                }
            } else {
                return { success: false, error: responseSocial?.data?.error || 'Authentication error' };
            }
        } catch (error) {
            console.log('authenticateSocial error', error);
            return { success: false, error: error.message || 'Authentication error' };
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading]);

    return {
        authenticateSocial,
        loading
    };
};