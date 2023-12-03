import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config';

const sendUserToken = async (token) => {
    const endpoint = '/api/verifyUserToken'; // Укажите здесь конечную точку для отправки токена
    const url = `${BASE_URL}/${endpoint}`;

    if (IS_TEST_MODE) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: 400,
                    data: {
                        isRegistrated: true,
                        astrobot: "Bruce",
                        language: 'Русский',
                        generalContent: true,
                        businessContent: true,
                        relationContent: true,
                        healthContent: false,
                        aspectsContent: false,
                        gender: "male",
                        birthDate: "1966-09-04",
                        birthTime: "00:53:28",
                        birthCountry: "Ukraine",
                        birthCity: "Kharkov",
                        biography: '',
                        subsciptionType: 'Premium',
                        subsciptionPerMonth: 0,
                        subscriptionPerYear: 0,
                    }
                });
            }, 500); // Имитация задержки сети
        });
    } else {
        // Реальная отправка токена на сервер
        try {
            const response = await axios.post(url, { token });
            return response.data;
        } catch (error) {
            console.error(`Error sending token to ${url}:`, error);
            throw error;
        }
    }
};

export { sendUserToken };