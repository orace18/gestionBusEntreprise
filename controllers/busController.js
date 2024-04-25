const Bus = require('../models/bus');

exports.createBus = async (req, res) => {
    try {
        const result = await Bus.createBus(...Object.values(req.body));
        res.status(201).send(`Bus créé avec succès avec l'ID ${result}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllBuses = async (req, res) => {
    try {
        const buses = await Bus.getAllBuses();
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getBusById = async (req, res) => {
    try {
        const { id } = req.params;
        const bus = await Bus.getBusById(id);
        if (bus) {
            res.status(200).json(bus);
        } else {
            res.status(404).send('Bus non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateBus = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Bus.updateBus(id, ...Object.values(req.body));
        if (affectedRows > 0) {
            res.status(200).send('Bus mis à jour avec succès');
        } else {
            res.status(404).send('Bus non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteBus = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Bus.deleteBus(id);
        if (affectedRows > 0) {
            res.status(200).send('Bus supprimé avec succès');
        } else {
            res.status(404).send('Bus non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
