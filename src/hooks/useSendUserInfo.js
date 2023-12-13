import React, { useState, useCallback } from "react";

import { useUser } from '../context/UserContext';
import { sendUserInfoToServer } from '../services/sendUserInfoToServer';

export const useSendUserInfo = () => {
    const { user, setUser } = useUser();
    const [loading, setLoading] = useState(false);

    const createErrorResponse = (status, data) => ({
        success: false,
        status: status,
        error: data?.error || 'sendUserInfo error'
    });

    const sendUserInfo = useCallback(async (endpoint, userInfo) => {
        try {
            setLoading(true);
            console.log('sendUserInfo endpoint:', endpoint);
            console.log('sendUserInfo userInfo:', userInfo);
            const response = await sendUserInfoToServer(endpoint, userInfo);
            console.log('sendUserInfo response:', response);
            console.log('sendUserInfo response.data:', response.data);
            console.log('sendUserInfo response.status:', response.status);

            if (response && response.data) {
                if (response.status === 200) {

                    setUser(prevUser => ({
                        ...prevUser,
                        ...response.data.user,
                    }));

                    console.log('sendUserInfo user:', user);
                    return { success: true, status: 200 };
                }
                else if (response.status === 401) {
                    setUser(prevUser => ({
                        ...prevUser,
                        isAuthenticated: false
                    }));
                    return createErrorResponse(401, response.data);
                }
                else {
                    return createErrorResponse(400, response.data);
                }
            } else {
                return createErrorResponse(400);
            }
        } catch (error) {
            return createErrorResponse(500, { error: error.message });
        } finally {
            setLoading(false);
        }
    }, [setUser, setLoading]);

    return {
        sendUserInfo, loading
    };
};