const Ligne = require('../models/ligne');

exports.createLigne = async (req, res) => {
    const { nomDeLaLigne, depart, destination, heureDepart, heureDestination, nombreEscales, lieuesEscales } = req.body;
    try {
        const id = await Ligne.createLigne(nomDeLaLigne, depart, destination, heureDepart, heureDestination, nombreEscales, lieuesEscales);
        res.status(201).send(`Ligne créée avec l'ID ${id}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllLignes = async (req, res) => {
    try {
        const lignes = await Ligne.getAllLignes();
        res.status(200).json(lignes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getLigneById = async (req, res) => {
    const { id } = req.params;
    try {
        const ligne = await Ligne.getLigneById(id);
        if (!ligne) {
            res.status(404).send('Ligne non trouvée');
            return;
        }
        res.status(200).json(ligne);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateLigne = async (req, res) => {
    const { id } = req.params;
    const { nomDeLaLigne, depart, destination, heureDepart, heureDestination, nombreEscales, lieuesEscales } = req.body;
    try {
        const affectedRows = await Ligne.updateLigne(id, nomDeLaLigne, depart, destination, heureDepart, heureDestination, nombreEscales, lieuesEscales);
        if (affectedRows === 0) {
            res.status(404).send('Ligne non trouvée');
            return;
        }
        res.status(200).send(`Ligne mise à jour avec succès`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteLigne = async (req, res) => {
    const { id } = req.params;
    try {
        const affectedRows = await Ligne.deleteLigne(id);
        if (affectedRows === 0) {
            res.status(404).send('Ligne non trouvée');
            return;
        }
        res.status(200).send(`Ligne supprimée avec succès`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
