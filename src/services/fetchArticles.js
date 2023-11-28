import axios from 'axios';
import { IS_TEST_MODE, BASE_URL } from '../config/config';

const fetchArticles = async (recipient, articleType, missingDates) => {
    const endpoint = '/api/content_data';
    const url = `${BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token'); // Получаем токен из localStorage

    if (IS_TEST_MODE) {
        // В тестовом режиме возвращаем фиктивные данные
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(missingDates.map(date => ({
                    recipient,
                    astrobot: 'Bruce',
                    articleType,
                    publication_date: date,
                    title: `Тестовая статья для ${date}`,
                    content: 'Это тестовое содержание статьи.'
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