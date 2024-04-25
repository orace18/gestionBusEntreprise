const Agence = require('../models/agence');

exports.createAgence = async (req, res) => {
    try {
        const { type, siege, tel, idDirecteur } = req.body;
        const id = await Agence.createAgence(type, siege, tel, idDirecteur);
        res.status(201).send(`Agence créée avec l'ID ${id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllAgences = async (req, res) => {
    try {
        const agences = await Agence.getAllAgences();
        res.status(200).json(agences);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAgenceById = async (req, res) => {
    try {
        const { id } = req.params;
        const agence = await Agence.getAgenceById(id);
        if (agence) {
            res.status(200).json(agence);
        } else {
            res.status(404).send('Agence non trouvée');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateAgence = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, siege, tel, idDirecteur } = req.body;
        const affectedRows = await Agence.updateAgence(id, type, siege, tel, idDirecteur);
        if (affectedRows > 0) {
            res.status(200).send('Agence mise à jour avec succès');
        } else {
            res.status(404).send('Agence non trouvée');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteAgence = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Agence.deleteAgence(id);
        if (affectedRows > 0) {
            res.status(200).send('Agence supprimée avec succès');
        } else {
            res.status(404).send('Agence non trouvée');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
