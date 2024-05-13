const pool = require('../databases/database');  

exports.createBus = (immatriculation, nombreDeRoues, nombreDePlaces, couleur, etat, heureDepart, heureDestination, dateDepart, dateDestination, type, idConducteur) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO Bus (immatriculation, nombrederoue, nombredeplace, couleur, etat, heuredepart, heuredestination, datedepart, datedestination, type, idconducteur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [immatriculation, nombreDeRoues, nombreDePlaces, couleur, etat, heureDepart, heureDestination, dateDepart, dateDestination, type, idConducteur],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            }
        );
    });
};

exports.getAllBuses = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Bus', (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getBusById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Bus WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};

exports.updateBus = (id, immatriculation, nombreDeRoues, nombreDePlaces, couleur, etat, idLigne, heureDepart, heureDestination, dateDepart, dateDestination, type, idConducteur) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE Bus SET immatriculation = ?, nombrederoue = ?, nombredeplace = ?, couleur = ?, etat = ?, idligne = ?, heuredepart = ?, heuredestination = ?, datedepart = ?, datedestination = ?, type = ?, idconducteur = ? WHERE id = ?',
            [immatriculation, nombreDeRoues, nombreDePlaces, couleur, etat, idLigne, heureDepart, heureDestination, dateDepart, dateDestination, type, idConducteur, id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            }
        );
    });
};

exports.deleteBus = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM Bus WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows);
        });
    });
};
