import SQLite from 'react-native-sqlite-storage';

const initializeDatabase = () => {
    const db = SQLite.openDatabase(
        { name: 'articles.db', location: 'default' },
        () => { console.log('Database opened'); },
        error => { console.log('Error opening database: ' + error.message); }
    );

    db.transaction(tx => {
        // Создание таблицы
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS Articles (id INTEGER PRIMARY KEY AUTOINCREMENT, recipient TEXT, astrobot TEXT, article_type TEXT, publication_date DATE, title TEXT, content TEXT);',
            [],
            () => { console.log('Table created successfully'); },
            error => { console.log('Error creating table: ' + error.message); }
        );

        // Создание индексов
        tx.executeSql(
            'CREATE INDEX IF NOT EXISTS idx_recipient ON Articles (recipient);',
            [],
            () => { console.log('Index on recipient created successfully'); },
            error => { console.log('Error creating index on recipient: ' + error.message); }
        );

        tx.executeSql(
            'CREATE INDEX IF NOT EXISTS idx_article_type ON Articles (article_type);',
            [],
            () => { console.log('Index on article_type created successfully'); },
            error => { console.log('Error creating index on article_type: ' + error.message); }
        );

        tx.executeSql(
            'CREATE INDEX IF NOT EXISTS idx_publication_date ON Articles (publication_date);',
            [],
            () => { console.log('Index on publication_date created successfully'); },
            error => { console.log('Error creating index on publication_date: ' + error.message); }
        );
    });

    return db;
};

export default initializeDatabase;