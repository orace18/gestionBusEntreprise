const pool = require('../databases/database'); 


exports.getAllDirecteurs = (req, res) => {
    pool.query('SELECT * FROM DirecteurAgence', (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des directeurs d'agence: ", err);
            res.status(500).send('Erreur lors de la récupération des directeurs d\'agence');
        } else {
            res.status(200).json(results);
        }
    });
};


exports.getDirecteurById = (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM DirecteurAgence WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération du directeur d'agence: ", err);
            res.status(500).send('Erreur lors de la récupération du directeur d\'agence');
        } else if (results.length === 0) {
            res.status(404).send('Directeur d\'agence non trouvé');
        } else {
            res.status(200).json(results[0]);
        }
    });
};


exports.createDirecteur = (req, res) => {
    const { nom, prenom, tel, typediplome } = req.body;
    if (!nom || !prenom) {
        return res.status(400).send('Le nom et le prénom sont obligatoires');
    }
    pool.query(
        'INSERT INTO DirecteurAgence (nom, prenom, tel, typediplome) VALUES (?, ?, ?, ?)', 
        [nom, prenom, tel, typediplome], 
        (err, results) => {
            if (err) {
                console.error("Erreur lors de la création du directeur d'agence: ", err);
                res.status(500).send('Erreur lors de la création du directeur d\'agence');
            } else {
                res.status(201).send(`Directeur d'agence créé avec succès avec l'ID ${results.insertId}`);
            }
        }
    );
};


exports.updateDirecteur = (req, res) => {
    const { id } = req.params;
    const { nom, prenom, tel, typediplome } = req.body;
    pool.query(
        'UPDATE DirecteurAgence SET nom = ?, prenom = ?, tel = ?, typediplome = ? WHERE id = ?', 
        [nom, prenom, tel, typediplome, id], 
        (err, results) => {
            if (err) {
                console.error("Erreur lors de la mise à jour du directeur d'agence: ", err);
                res.status(500).send('Erreur lors de la mise à jour du directeur d\'agence');
            } else if (results.affectedRows === 0) {
                res.status(404).send('Directeur d\'agence non trouvé');
            } else {
                res.status(200).send('Directeur d\'agence mis à jour avec succès');
            }
        }
    );
};


exports.deleteDirecteur = (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM DirecteurAgence WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error("Erreur lors de la suppression du directeur d'agence: ", err);
            res.status(500).send('Erreur lors de la suppression du directeur d\'agence');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Directeur d\'agence non trouvé');
        } else {
            res.status(200).send('Directeur d\'agence supprimé avec succès');
        }
    });
};
