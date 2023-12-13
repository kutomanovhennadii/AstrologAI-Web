import fetchArticles from '../services/fetchArticles';
import { addArticles, getAllArticles, deleteArticles } from './articlesModel';

const NUMBER_OF_ARTICLES = 6; // Количество статей для загрузки
const LIMIT_OF_DAILY_ARTICLES = 0; // Максимальное количество статей для 'D'
const LIMIT_OF_WEEKLY_OR_MONTHLY_ARTICLES = 0; // Для 'W' и 'M'

let currentIndex = 0;
let currentRecipient = '';
let currentArticleType = '';
let articles = [];

const nextArticles = async (user, recipient, articleType, startIndex = null) => {
    //console.log('Next articles:', recipient, articleType, currentIndex, currentArticleType, currentRecipient);

    currentIndex = startIndex !== null ? startIndex : currentIndex;

    if (currentRecipient !== recipient || currentArticleType !== articleType) {
        currentRecipient = recipient;
        currentArticleType = articleType;
        currentIndex = 0;

        //console.log('Next articles _:', currentIndex, currentArticleType, currentRecipient);
        // Получаем все статьи для данного recipient и articleType
        articles = await getAllArticles({ recipient: currentRecipient, articleType: currentArticleType });
        //console.log('Articles:', articles);

        // Проверяем количество статей и удаляем старые
        await checkAndRemoveOldArticles(articles, articleType);

    }
    //console.log('Next articles 2:', recipient, articleType, currentIndex, currentArticleType, currentRecipient);
    articles = await checkAndFetchMissingArticles(user, currentRecipient, currentArticleType, currentIndex, NUMBER_OF_ARTICLES);
    //console.log('Articles:', articles);

    result = articles.slice(currentIndex, currentIndex + NUMBER_OF_ARTICLES);

    currentIndex += NUMBER_OF_ARTICLES;
    //console.log('Next articles 3:', currentIndex);

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
        //console.log('Check and fetch missing articles:', recipient, articleType, startIndex, number);
        // Получаем данные о пользователе
        const userName = user.name; // Имя пользователя
        const userRegistrationDate = new Date(user.registratedDate); // Дата регистрации пользователя
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
        console.log('checkAndFetchMissingArticles Missing dates:', missingDates);

        // Запрашиваем недостающие статьи
        if (missingDates.length > 0) {
            const response = await fetchArticles(recipient, articleType, missingDates);
            //console.log('checkAndFetchMissingArticles New articles:', response.data);
            console.log('checkAndFetchMissingArticles New articles number:', response.data.length);
            if (response.status === 200) {
                const newArticles = response.data;
                await addArticles(newArticles);
                articles = articles.concat(newArticles);
            }
            else {
                console.log('checkAndFetchMissingArticles Error:', response.data.error);
            }
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
        // Устанавливаем дату на воскресенье текущей недели
        startDate.setDate(startDate.getDate() - startDate.getDay());
    } else if (articleType === 'M') {
        // Устанавливаем дату на первый день текущего месяца
        startDate.setDate(1);
    }

    //console.log('Start date:', articleType, startDate);
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
    //console.log('Dates to check:', dates);
    return dates;
};

export { nextArticles };