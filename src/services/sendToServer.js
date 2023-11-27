import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config';

const sendToServer = async (endpoint, data) => {
    const url = `${BASE_URL}/${endpoint}`;

    if (IS_TEST_MODE) {
        // Имитация ответа сервера в тестовом режиме
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data);
            }, 500); // Имитация задержки сети в полсекунды
        });
    } else {
        // Реальная логика отправки данных на сервер
        try {
            const response = await axios.post(url, data);

            if (response.status == 200) {
                return response.data;
            }

            throw new Error('No data received');
        } catch (error) {
            console.error(`Error sending data to ${url}:`, error);
            throw error;
        }
    }
};

// Теперь вы можете экспортировать функцию sendToServer и использовать её для отправки различных данных:
export { sendToServer };