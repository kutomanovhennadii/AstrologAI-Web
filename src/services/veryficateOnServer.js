import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config';

export const veryficateOnServer = async ({ name, email, password, verification }) => {
    const endpoint = '/api/verifyUser'; // Укажите здесь конечную точку для отправки токена
    const url = `${BASE_URL}/${endpoint}`;

    if (IS_TEST_MODE) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data:
                    {
                        token: 'fake-token',
                        user: {
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
                    }
                });
            }, 500); // Имитация задержки сети
        });
    } else {
        // Реальная отправка токена на сервер
        try {
            const response = await axios.post(url, { name, email, password, verification });
            return response.data;
        } catch (error) {
            return {
                status: 500,
                data: { error: error.message }
            };
        }
    }
};