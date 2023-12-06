import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config'; // Убедитесь, что путь указан правильно

export const authenticateSocialOnServer = async (data) => {
    console.log('authenticateSocialOnServer data', data);
    const { socialNetwork, token } = data;
    console.log('authenticateSocialOnServer', socialNetwork, token);
    
    const endpoint = '/api/authenticateSocial'; // Укажите здесь конечную точку для аутентификации
    const url = `${BASE_URL}${endpoint}`;

    console.log('authenticateSocialOnServer IS_TEST_MODE', IS_TEST_MODE);
    if (IS_TEST_MODE) {
        // Имитация ответа сервера для тестового режима
        return new Promise(resolve => {
            console.log('authenticateSocialOnServer IS_TEST_MODE');
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: {
                        token: 'fake-server-token',
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
            }, 500);
        });
    } else {
        // Реальная отправка данных на сервер
        try {
            const response = await axios.post(url, {
                socialNetwork,
                token,
            });
            return {
                status: response.status,
                data: response.data
            };
        } catch (error) {
            return {
                status: 500,
                data: { error: error.message }
            };
        }
    }
};