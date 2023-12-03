import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('articles.db');

const executeSql = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        database.transaction(tx => {
            tx.executeSql(
                sql,
                params,
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
};

const addArticle = async (article) => {
    const sql = 'INSERT INTO Articles (recipient, astrobot, article_type, publication_date, title, content) VALUES (?, ?, ?, ?, ?, ?);';
    const params = [article.recipient, article.astrobot, article.article_type, article.publication_date, article.title, article.content];
    return await executeSql(sql, params);
};

const addArticles = async (articles) => {
    for (let article of articles) {
        //await addArticle(article);
    }
    //console.log('Articles added successfully');
};

const getArticles = async ({ recipient, articleType, startNumber, endNumber }) => {
    const limit = endNumber - startNumber + 1;
    const sql = 'SELECT * FROM Articles WHERE recipient = ? AND article_type = ? ORDER BY publication_date DESC LIMIT ? OFFSET ?;';
    return await executeSql(sql, [recipient, articleType, limit, startNumber]);
};

const getAllArticles = async ({ recipient, articleType }) => {
    //console.log('Get all articles:', recipient, articleType);
    const sql = 'SELECT * FROM Articles WHERE recipient = ? AND article_type = ? ORDER BY publication_date DESC;';
    const result = await executeSql(sql, [recipient, articleType]);

    // Возвращаем только массив с результатами
    return result.rows._array;
};

const updateArticle = async (id, newValues) => {
    const sql = 'UPDATE Articles SET recipient = ?, astrobot = ?, article_type = ?, publication_date = ?, title = ?, content = ? WHERE id = ?;';
    const params = [newValues.recipient, newValues.astrobot, newValues.article_type, newValues.publication_date, newValues.title, newValues.content, id];
    return await executeSql(sql, params);
};

const deleteArticle = async (id) => {
    const sql = 'DELETE FROM Articles WHERE id = ?;';
    return await executeSql(sql, [id]);
};

const deleteArticles = async (ids) => {
    const placeholders = ids.map(() => '?').join(', ');
    const sql = `DELETE FROM Articles WHERE id IN (${placeholders});`;
    return await executeSql(sql, ids);
};

export { addArticles, getAllArticles, deleteArticles };