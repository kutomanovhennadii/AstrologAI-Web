import { addArticles, getArticles } from './articlesModel';
import { fetchArticlesFromBackend } from './api'; // предполагается, что у вас есть такой метод для запроса статей с бэкенда

const NUMBER_OF_ARTICLES = 3; // Количество статей для загрузки

let currentLength = 0;
let currentRecipient = '';
let currentArticleType = '';

// Сбросить текущую позицию при смене recipient или articleType
const resetCurrentLength = (recipient, articleType) => {
    if (currentRecipient !== recipient || currentArticleType !== articleType) {
        currentRecipient = recipient;
        currentArticleType = articleType;
        currentLength = 0;
    }
};

// Проверить наличие статей на текущую дату и запросить с бэкенда при необходимости
const checkAndFetchArticles = async (recipient, articleType) => {
    const today = new Date().toISOString().split('T')[0]; // Формат 'YYYY-MM-DD'
    let articles = await getArticlesForDate(recipient, articleType, today);

    if (articles.length === 0) {
        // Запросить статьи с бэкенда и добавить в базу данных
        const newArticles = await fetchArticlesFromBackend(recipient, articleType);
        await addArticles(newArticles);
    }
};

// Получить статьи для определенной даты
const getArticlesForDate = (recipient, articleType, date) => {
    return new Promise((resolve, reject) => {
        getArticles({ recipient, articleType, startNumber: 0, endNumber: NUMBER_OF_ARTICLES }, (error, articles) => {
            if (error) {
                reject(error);
            } else {
                resolve(articles.filter(article => article.publication_date === date));
            }
        });
    });
};

// Получить ленту статей
const getArticleFeed = async (recipient, articleType) => {
    resetCurrentLength(recipient, articleType);

    await checkAndFetchArticles(recipient, articleType);

    return new Promise((resolve, reject) => {
        getArticles({ recipient, articleType, startNumber: currentLength, endNumber: currentLength + NUMBER_OF_ARTICLES - 1 }, (error, articles) => {
            if (error) {
                reject(error);
            } else {
                currentLength += articles.length; // Обновить текущую позицию
                resolve(articles);
            }
        });
    });
};


// Подгрузить дополнительные статьи для ленты
const loadMoreArticles = async (recipient, articleType, currentLength) => {

    // Получить следующий набор статей
    return await getArticleFeed(recipient, articleType);
};

export { getArticleFeed, loadMoreArticles };