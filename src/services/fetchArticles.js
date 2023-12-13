import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IS_TEST_MODE, BASE_URL } from '../config/config';

const fetchArticles = async (recipient, articleType, missingDates) => {
    //console.log('Fetch articles:', recipient, articleType, missingDates);

    const endpoint = '/api/content/';
    const url = `${BASE_URL}${endpoint}`;
    console.log('Fetch articles URL:', url);

    if (IS_TEST_MODE) {
        // В тестовом режиме возвращаем фиктивные данные
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(missingDates.map((date, index) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    recipient,
                    astrobot: 'Bruce',
                    articleType,
                    publication_date: date,
                    title: `Тест для ${date}`,
                    content: 'Это тестовое содержание статьи. Это тестовое содержание статьи. Это тестовое содержание статьи.'
                })));
            }, 500); // Имитация задержки сети
        });
    } else {
        // Реальный запрос на сервер
        try {
            const token = await AsyncStorage.getItem('userToken');
            console.log('Fetch articles Token:', token);
            console.log('Fetch articles Dates:', missingDates);

            const response = await axios.get(url, {
                params: {
                    recipient: recipient,
                    articleType: articleType,
                    dates: missingDates,
                    token: token
                },
                headers: { "Authorization": `Bearer ${token}` }
            });
            //console.log('Fetch articles Response:', response);
            //console.log('Fetch articles Response.data:', response.data);


            return {
                status: response.status,
                data: response.data.data
            };

            throw new Error('No valid response received');
        } catch (error) {
            console.error(`Error fetching articles from ${url}:`, error);
            return {
                status: 500,
                data: { error: error.message }
            };
        }
    }
};

export default fetchArticles;