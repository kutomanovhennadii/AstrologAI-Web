import { fetchArticles } from '../services/fetchArticles';
import { addArticles, getAllArticles, deleteArticles } from './articlesModel';

const NUMBER_OF_ARTICLES = 6; // Количество статей для загрузки
const LIMIT_OF_DAILY_ARTICLES = 30; // Максимальное количество статей для 'D'
const LIMIT_OF_WEEKLY_OR_MONTHLY_ARTICLES = 12; // Для 'W' и 'M'

let currentIndex = 0;
let currentRecipient = '';
let currentArticleType = '';
let articles = [];

const nextArticles = async (user, recipient, articleType) => {
    if (currentRecipient !== recipient || currentArticleType !== articleType) {
        currentRecipient = recipient;
        currentArticleType = articleType;
        currentIndex = 0;

        // Получаем все статьи для данного recipient и articleType
        articles = await getAllArticles(currentRecipient, currentArticleType);

        // Проверяем количество статей и удаляем старые
        await checkAndRemoveOldArticles(articles, articleType);
    }

    articles = await checkAndFetchMissingArticles(user, currentRecipient, currentArticleType, currentIndex, NUMBER_OF_ARTICLES);
    result = articles.slice(currentIndex, currentIndex + NUMBER_OF_ARTICLES);

    currentIndex += NUMBER_OF_ARTICLES;

    return result;
};

const checkAndRemoveOldArticles = async (articles, articleType) => {
    try {
        const limit = articleType === 'D' ? LIMIT_OF_DAILY_ARTICLES : LIMIT_OF_WEEKLY_OR_MONTHLY_ARTICLES;

        if (articles.length > limit) {
            // Получаем идентификаторы статей для удаления
            const idsToDelete = articles.slice(limit).map(article => article.id);

            // Пакетное удаление статей
            await deleteArticles(idsToDelete);

            // Обновляем массив articles, удаляя статьи, которые были удалены
            articles = articles.slice(0, limit);
        }

        return articles;
    } catch (error) {
        console.error('Error in checkAndRemoveOldArticles:', error);
        // Обработка ошибки или дальнейшее её пробрасывание
        throw error;
    }
};

const checkAndFetchMissingArticles = async (user, recipient, articleType, startIndex, number) => {
    try {
        // Получаем данные о пользователе
        const userName = user.name; // Имя пользователя
        const userRegistrationDate = new Date(userData.registratedDate); // Дата регистрации пользователя
        const appDate = new Date('2023-01-27'); // Дата выхода приложения

        // Получаем список дат, за которые нужно проверить наличие статей
        const datesToCheck = getDatesToCheck(articleType, startIndex, number);

        // Фильтрация дат, если recipient - текущий пользователь и дата раньше его регистрации
        const filteredDates = (userName === recipient) ?
            datesToCheck.filter(date => new Date(date) >= userRegistrationDate) :
            datesToCheck.filter(date => new Date(date) >= appDate);

        // Определяем недостающие даты
        const missingDates = filteredDates.filter(date => {
            return !articles.some(article => article.publication_date === date);
        });

        // Запрашиваем недостающие статьи
        if (missingDates.length > 0) {
            const newArticles = await fetchArticles(recipient, articleType, missingDates);
            await addArticles(newArticles);
            articles = articles.concat(newArticles);
        }

        // Сортировка статей по убыванию даты
        articles = articles.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date));

        return articles;
    } catch (error) {
        console.error('Error in checkAndFetchMissingArticles:', error);
        // Обработка ошибки или дальнейшее её пробрасывание
        throw error;
    }
};

// Получить список дат, за которые нужно проверить наличие статей
const getDatesToCheck = (articleType, startIndex, number) => {
    let dates = [];
    let startDate = new Date();

    if (articleType === 'W') {
        startDate.setDate(1); // Первый день текущего месяца
    } else if (articleType === 'M') {
        startDate.setDate(startDate.getDate() - startDate.getDay()); // Воскресенье текущей недели
    } // Для 'D' startDate остается текущим днем

    for (let i = startIndex; i < startIndex + number; i++) {
        const checkDate = new Date(startDate);

        if (articleType === 'W') {
            checkDate.setDate(startDate.getDate() - i * 7); // Назад на неделю
        } else if (articleType === 'M') {
            checkDate.setMonth(startDate.getMonth() - i); // Назад на месяц
        } else {
            checkDate.setDate(startDate.getDate() - i); // Назад на день
        }

        dates.push(checkDate.toISOString().split('T')[0]);
    }

    return dates;
};

export { nextArticles };