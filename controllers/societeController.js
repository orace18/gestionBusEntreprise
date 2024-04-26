const Societe = require('../models/societe');

exports.createSociete = async (req, res) => {
    try {
        const { nom, numero, userId } = req.body;
        const result = await Societe.createSociete(nom, numero, userId);
        res.status(201).send(`Société créée avec succès avec l'ID ${result}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllSocietes = async (req, res) => {
    try {
        const societes = await Societe.getAllSocietes();
        res.status(200).json(societes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getSocieteById = async (req, res) => {
    try {
        const { id } = req.params;
        const societe = await Societe.getSocieteById(id);
        if (societe) {
            res.status(200).json(societe);
        } else {
            res.status(404).send('Société non trouvée');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSociete = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, numero, userId } = req.body;
        const affectedRows = await Societe.updateSociete(id, nom, numero, userId);
        if (affectedRows > 0) {
            res.status(200).send('Société mise à jour avec succès');
        } else {
            res.status(404).send('Société non trouvée');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteSociete = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Societe.deleteSociete(id);
        if (affectedRows > 0) {
            res.status(200).send('Société supprimée avec succès');
        } else {
            res.status(404).send('Société non trouvée');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
