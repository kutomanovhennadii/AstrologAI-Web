import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config';

const sendUserToken = async (token) => {
    const endpoint = '/api/verifyUserToken/'; // Укажите здесь конечную точку для отправки токена
    const url = `${BASE_URL}${endpoint}`;
    console.log('sendUserToken URL:', url);

    if (IS_TEST_MODE) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data:
                    {
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
            console.log('sendUserToken Sending token:', token);
            const response = await axios.post(url, { token });
            console.log('sendUserToken Response:', response);
            console.log('registerOnServer response.data.data:', response.data.data);
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

export { sendUserToken };