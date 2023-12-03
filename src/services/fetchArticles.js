import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IS_TEST_MODE, BASE_URL } from '../config/config';

const fetchArticles = async (recipient, articleType, missingDates) => {
    //console.log('Fetch articles:', recipient, articleType, missingDates);

    const endpoint = '/api/content';
    const url = `${BASE_URL}${endpoint}`;
    const token = await AsyncStorage.getItem('userToken');
    

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
            const response = await axios.get(url, {
                params: {
                    recipient: recipient,
                    articleType: articleType,
                    dates: missingDates
                },
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (response.status === 200) {
                return response.data.articles;
            }

            throw new Error('No valid response received');
        } catch (error) {
            console.error(`Error fetching articles from ${url}:`, error);
            throw error;
        }
    }
};

export default fetchArticles;