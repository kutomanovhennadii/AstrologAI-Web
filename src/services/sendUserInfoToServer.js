import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IS_TEST_MODE, BASE_URL } from '../config/config';

const sendUserInfoToServer = async (endpoint, user_info) => {
    //console.log('sendUserInfoToServer user_info:', user_info);
    const url = `${BASE_URL}/api/${endpoint}`;
    console.log('sendUserInfoToServer URL:', url);
    const token = await AsyncStorage.getItem('userToken');
    console.log('sendUserInfoToServer token:', token);
    if (!token) {
        return {
            status: 401,
            data: { error: "There is not user token" }
        };
    }

    if (IS_TEST_MODE) {
        // Имитация ответа сервера в тестовом режиме
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: {
                        user_info: user_info
                    }
                });
            }, 500); // Имитация задержки сети в полсекунды
        });
    } else {
        // Реальная логика отправки данных на сервер
        try {
            console.log('sendUserInfoToServer user_info:', user_info);
            const response = await axios.post(url,
                {
                    user_info: user_info,
                    token: token
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                },
                {
                    validateStatus: function (status) {
                        return status < 500; // Резолвит промис для всех статусов меньше 500
                    }
                });
            console.log('sendUserInfoToServer response:', response);
            console.log('sendUserInfoToServer response.data:', response.data);
            console.log('sendUserInfoToServer response.status:', response.status);
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

// Теперь вы можете экспортировать функцию sendToServer и использовать её для отправки различных данных:
export { sendUserInfoToServer };