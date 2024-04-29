const pool = require('../databases/database');  

exports.createTicket = (type, nomVoyeur, dateAchat, dateVoyage, lieuDepart, lieuDestination, heureDepart, idAgence, idLigne, heureDestination) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO Ticket (type, nomvoyeur, dateachat, datevoyage, lieudepart, lieudestination, heuredepart, idAgence, idligne, heuredestination) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [type, nomVoyeur, dateAchat, dateVoyage, lieuDepart, lieuDestination, heureDepart, idAgence, idLigne, heureDestination],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.insertId);
            }
        );
    });
};

exports.getAllTickets = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Ticket', (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM Ticket WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
};


/* exports.updateTicket = (id, type, nomVoyeur, dateAchat, dateVoyage, lieuDepart, lieuDestination, heureDepart, idAgence, idLigne, heureDestination) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE Ticket SET type = ?, nomvoyeur = ?, dateachat = ?, datevoyage = ?, lieudepart = ?, lieudestination = ?, heuredepart = ?, idAgence = ?, idligne = ?, heuredestination = ? WHERE id = ?',
            [type, nomVoyeur, dateAchat, dateVoyage, lieuDepart, lieuDestination, heureDepart, idAgence, idLigne, heureDestination, id],
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            }
        );
    });
}; */

exports.updateTicket = (id, updates) => {
    console.log(updates); // Ajouter pour débugger le contenu de updates

    return new Promise((resolve, reject) => {
        const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updates);
        values.push(id); // Ajouter l'id à la fin de la liste des valeurs pour la clause WHERE

        const query = `UPDATE Ticket SET ${fields} WHERE id = ?`;
        console.log(query); // Afficher la requête pour débugger

        pool.query(
            query,
            values,
            (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results.affectedRows);
            }
        );
    });
};



exports.deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM Ticket WHERE id = ?', [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results.affectedRows);
        });
    });
};
