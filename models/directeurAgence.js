const pool = require('../databases/database');

exports.addDirecteur = (nom, prenom, tel, typediplome) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO DirecteurAgence (nom, prenom, tel, typediplome) VALUES (?, ?, ?, ?)',
            [nom, prenom, tel, typediplome],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            }
        );
    });
};

exports.getDirecteurById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT * FROM DirecteurAgence WHERE id = ?',
            [id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results[0]);
            }
        );
    });
};

