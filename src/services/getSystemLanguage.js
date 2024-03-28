// getSystemLanguage.js

const getSystemLanguage = () => {
    //const languageCode = Localization.locale.split('-')[0];
    let language = 'English'; // значение по умолчанию

    // if (languageCode === 'ru') {
    //     language = 'Русский';
    // } else if (languageCode === 'uk') {
    //     language = 'Український';
    // }

    return language;
};

export default getSystemLanguage;