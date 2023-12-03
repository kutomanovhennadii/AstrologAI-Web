import * as SQLite from 'expo-sqlite';

const initializeDatabase = () => {
    const db = SQLite.openDatabase('articles.db');

    db.transaction(tx => {
        // Создание таблицы
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Articles (id INTEGER PRIMARY KEY AUTOINCREMENT, recipient TEXT, astrobot TEXT, article_type TEXT, publication_date DATE, title TEXT, content TEXT);'
        );

        // Создание индексов
        tx.executeSql('CREATE INDEX IF NOT EXISTS idx_recipient ON Articles (recipient);');
        tx.executeSql('CREATE INDEX IF NOT EXISTS idx_article_type ON Articles (article_type);');
        tx.executeSql('CREATE INDEX IF NOT EXISTS idx_publication_date ON Articles (publication_date);');
    }, (error) => {
        console.log('Transaction error: ', error);
    }, () => {
        console.log('Database initialized');
    });

    return db;
};

export default initializeDatabase;