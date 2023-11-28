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

const addArticles = async (articles) => {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            articles.forEach(article => {
                tx.executeSql(
                    'INSERT INTO Articles (recipient, astrobot, article_type, publication_date, title, content) VALUES (?, ?, ?, ?, ?, ?);',
                    [article.recipient, article.astrobot, article.article_type, article.publication_date, article.title, article.content],
                    (_, result) => { },
                    (_, error) => { console.log('Error adding article: ' + error.message); }
                );
            });
        }, (error) => {
            console.log('Transaction error: ' + error.message);
            reject(error);
        }, () => {
            console.log('Transaction completed successfully');
            resolve('Articles added successfully');
        });
    });
};

const getArticles = ({ recipient, articleType, startNumber, endNumber }) => {
    return new Promise((resolve, reject) => {
        const limit = endNumber - startNumber + 1;
        database.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Articles WHERE recipient = ? AND article_type = ? ORDER BY publication_date DESC LIMIT ? OFFSET ?;',
                [recipient, articleType, limit, startNumber],
                (_, result) => resolve(result.rows.raw()),
                (_, error) => reject(error)
            );
        });
    });
};

const getAllArticles = async ({ recipient, articleType }) => {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Articles WHERE recipient = ? AND article_type = ? ORDER BY publication_date DESC;',
                [recipient, articleType],
                (_, result) => resolve(result.rows.raw()),
                (_, error) => reject(error)
            );
        });
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

const deleteArticle = async (id) => {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                'DELETE FROM Articles WHERE id = ?;',
                [id],
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

const deleteArticles = async (ids) => {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            const placeholders = ids.map(() => '?').join(', ');
            tx.executeSql(
                `DELETE FROM Articles WHERE id IN (${placeholders});`,
                ids,
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

export { addArticles, getAllArticles, deleteArticles };