const Conducteur = require('../models/conducteur');

exports.createConducteur = async (req, res) => {
    try {
        const result = await Conducteur.createConducteur(...Object.values(req.body));
        res.status(201).send(`Conducteur créé avec succès avec l'ID ${result}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllConducteurs = async (req, res) => {
    try {
        const conducteurs = await Conducteur.getAllConducteurs();
        res.status(200).json(conducteurs);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getConducteurById = async (req, res) => {
    try {
        const { id } = req.params;
        const conducteur = await Conducteur.getConducteurById(id);
        if (conducteur) {
            res.status(200).json(conducteur);
        } else {
            res.status(404).send('Conducteur non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateConducteur = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Conducteur.updateConducteur(id, ...Object.values(req.body));
        if (affectedRows > 0) {
            res.status(200).send('Conducteur mis à jour avec succès');
        } else {
            res.status(404).send('Conducteur non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteConducteur = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Conducteur.deleteConducteur(id);
        if (affectedRows > 0) {
            res.status(200).send('Conducteur supprimé avec succès');
        } else {
            res.status(404).send('Conducteur non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
