import { useState, useCallback } from 'react';

import { veryficateOnServer } from '../services/veryficateOnServer'; 
import { useUser } from '../context/UserContext';

export const useVerification = () => {
    const { user, setUser } = useUser(); // Предполагается, что useUser() — это хук контекста
    const [loading, setLoading] = useState(false);

    const verifyUser = useCallback(async () => {
        // console.log(`Name: ${user.name}`);
        // console.log(`Email: ${user.email}`);
        // console.log(`Password: ${user.password}`);

        try {
            setLoading(true);
            const result = await veryficateOnServer({
                name: user.name,
                email: user.email,
                password: user.password
            });
            const verificationCode = result.verificationCode;
            setLoading(false);

            // Предположим, что верификационный код всегда должен быть строкой из четырех цифр
            if (verificationCode && verificationCode.length === 4) {
                //console.log("verifyUser verificationCode = ", verificationCode)
                setUser(prevUser => ({
                    ...prevUser,
                    verificationCode: verificationCode,
                }));
                // Сюда можно добавить логику, которая будет обрабатывать полученный код
                return verificationCode;
            } else {
                console.log('Verification failed')
                // Обработка ситуации, когда верификация не удалась
                return null;
            }
        } catch (error) {
            // Обработка ошибки верификации
            console.error(error);
            return null;
        }
    }, [user, setLoading]);

    return {
        verifyUser,
        loading
    };
};