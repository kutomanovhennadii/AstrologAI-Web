import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config';

export const veryficateOnServer = async ({ name, email, password, verification, language }) => {
    const endpoint = '/api/verifyUser/'; // Укажите здесь конечную точку для отправки токена
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
                            is_registration_completed: true,
                            astrobot: "Bruce",
                            language: 'Русский',
                            generalContent: true,
                            businessContent: true,
                            relationContent: true,
                            healthContent: false,
                            aspectsContent: false,
                            gender: "male",
                            birth_date: "1966-09-04",
                            birth_time: "00:53:28",
                            birth_country: "Ukraine",
                            birth_city: "Kharkov",
                            biography: '',
                            subscriptionType: 'Premium',
                            subscriptionPerMonth: 0,
                            subscriptionPerYear: 0,
                        }
                    }
                });
            }, 500); // Имитация задержки сети
        });
    } else {
        // Реальная отправка токена на сервер
        try {

            // console.log('veryficateOnServer name:', name);
            // console.log('veryficateOnServer email:', email);
            // console.log('veryficateOnServer password:', password);
            // console.log('veryficateOnServer verification:', verification);
            const response = await axios.post(url, { name, email, password, verification, language });
            // console.log('veryficateOnServer response:', response);
            // console.log('veryficateOnServer response.data:', response.data);
            // console.log('veryficateOnServer response.data.data:', response.data.data);

            return {
                status: response.status,
                data: response.data.data
            };
        } catch (error) {
            return {
                status: 500,
                data: { error: error.message }
            };
        }
    }
};