const pool = require('../databases/database'); 

exports.createSociete = (nom, numero, userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO society (nom, numero, userId, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
            [nom, numero, userId],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            }
        );
    });
};

exports.getAllSocietes = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM society', (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getSocieteById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM society WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

exports.updateSociete = (id, nom, numero, userId) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE societes SET nom = ?, numero = ?, userId = ?, updated_at = NOW() WHERE id = ?',
            [nom, numero, userId, id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            }
        );
    });
};

exports.deleteSociete = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM societes WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows);
        });
    });
};
