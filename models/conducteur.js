const pool = require('../databases/database');  

exports.createConducteur = (matricule, nom, prenom, tel, typePermis) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO Conducteur (matricule, nom, prenom, tel, typePermis) VALUES (?, ?, ?, ?, ?)',
            [matricule, nom, prenom, tel, typePermis],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            }
        );
    });
};

exports.getAllConducteurs = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Conducteur', (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getConducteurById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Conducteur WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

exports.updateConducteur = (id, matricule, nom, prenom, tel, typePermis) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE Conducteur SET matricule = ?, nom = ?, prenom = ?, tel = ?, typePermis = ? WHERE id = ?',
            [matricule, nom, prenom, tel, typePermis, id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            }
        );
    });
};

exports.deleteConducteur = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM Conducteur WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows);
        });
    });
};
