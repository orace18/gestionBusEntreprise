const Ticket = require('../models/ticket');

exports.createTicket = async (req, res) => {
    try {
        const result = await Ticket.createTicket(...Object.values(req.body));
        res.status(201).send(`Ticket créé avec succès avec l'ID ${result}`);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const ticket = await Ticket.getTicketById(id);
        if (ticket) {
            res.status(200).json(ticket);
        } else {
            res.status(404).send('Ticket non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Ticket.updateTicket(id, ...Object.values(req.body));
        if (affectedRows > 0) {
            res.status(200).send('Ticket mis à jour avec succès');
        } else {
            res.status(404).send('Ticket non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Ticket.deleteTicket(id);
        if (affectedRows > 0) {
            res.status(200).send('Ticket supprimé avec succès');
        } else {
            res.status(404).send('Ticket non trouvé');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
