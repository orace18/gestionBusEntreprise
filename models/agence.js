const pool = require('../databases/database');  

exports.createAgence = (type, siege, tel, idDirecteur) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO Agence (type, siege, tel, idDirecteur) VALUES (?, ?, ?, ?)',
            [type, siege, tel, idDirecteur],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            }
        );
    });
};

exports.getAllAgences = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Agence', (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getAgenceById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Agence WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

exports.updateAgence = (id, type, siege, tel, idDirecteur) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE Agence SET type = ?, siege = ?, tel = ?, idDirecteur = ? WHERE id = ?',
            [type, siege, tel, idDirecteur, id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            }
        );
    });
};

exports.deleteAgence = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM Agence WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows);
        });
    });
};
