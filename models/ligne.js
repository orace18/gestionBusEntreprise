const pool = require('../databases/database');

exports.createLigne = (nomDeLaLigne, depart, destination, heureDepart, heureDestination, nombreEscales, lieuesEscales) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO Lignes (nomdelaligne, depart, destination, heuredepart, heuredestination, nombresescales, lieuescales) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nomDeLaLigne, depart, destination, heureDepart, heureDestination, nombreEscales, lieuesEscales],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            }
        );
    });
};

exports.getAllLignes = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Lignes', (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getLigneById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Lignes WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

exports.updateLigne = (id, nomDeLaLigne, depart, destination, heureDepart, heureDestination, nombreEscales, lieuesEscales) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE Lignes SET nomdelaligne = ?, depart = ?, destination = ?, heuredepart = ?, heuredestination = ?, nombresescales = ?, lieuescales = ? WHERE id = ?',
            [nomDeLaLigne, depart, destination, heureDepart, heureDestination, nombreEscales, lieuesEscales, id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            }
        );
    });
};

exports.deleteLigne = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM Lignes WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows);
        });
    });
};
