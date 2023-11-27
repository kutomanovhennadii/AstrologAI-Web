import SQLite from 'react-native-sqlite-storage';

const database = SQLite.openDatabase({ name: 'articles.db', location: 'default' });

const addArticle = (article, callback) => {
    database.transaction(tx => {
        tx.executeSql(
            'INSERT INTO Articles (recipient, astrobot, article_type, publication_date, title, content) VALUES (?, ?, ?, ?, ?, ?);',
            [article.recipient, article.astrobot, article.article_type, article.publication_date, article.title, article.content],
            (_, result) => callback(null, result),
            (_, error) => callback(error)
        );
    });
};

const addArticles = (articles, callback) => {
    database.transaction(tx => {
        articles.forEach(article => {
            tx.executeSql(
                'INSERT INTO Articles (recipient, astrobot, article_type, publication_date, title, content) VALUES (?, ?, ?, ?, ?, ?);',
                [article.recipient, article.astrobot, article.article_type, article.publication_date, article.title, article.content],
                (_, result) => { },
                (_, error) => { console.log('Error adding article: ' + error.message); }
            );
        });
    }, (error) => { callback(error); }, () => { callback(null, 'Articles added successfully'); });
};

// const getArticles = (criteria, callback) => {
//     // Тут можно добавить логику фильтрации и сортировки на основе criteria
//     database.transaction(tx => {
//         tx.executeSql(
//             'SELECT * FROM Articles;',
//             [],
//             (_, result) => callback(null, result.rows.raw()),
//             (_, error) => callback(error)
//         );
//     });
// };

const getArticles = ({ recipient, articleType, startNumber, endNumber }, callback) => {
    const limit = endNumber - startNumber + 1;
    database.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM Articles WHERE recipient = ? AND article_type = ? ORDER BY publication_date DESC LIMIT ? OFFSET ?;',
            [recipient, articleType, limit, startNumber],
            (_, result) => callback(null, result.rows.raw()),
            (_, error) => callback(error)
        );
    });
};

const updateArticle = (id, newValues, callback) => {
    database.transaction(tx => {
        tx.executeSql(
            'UPDATE Articles SET recipient = ?, astrobot = ?, article_type = ?, publication_date = ?, title = ?, content = ? WHERE id = ?;',
            [newValues.recipient, newValues.astrobot, newValues.article_type, newValues.publication_date, newValues.title, newValues.content, id],
            (_, result) => callback(null, result),
            (_, error) => callback(error)
        );
    });
};

const deleteArticle = (id, callback) => {
    database.transaction(tx => {
        tx.executeSql(
            'DELETE FROM Articles WHERE id = ?;',
            [id],
            (_, result) => callback(null, result),
            (_, error) => callback(error)
        );
    });
};

export { addArticle, getArticles, updateArticle, deleteArticle };