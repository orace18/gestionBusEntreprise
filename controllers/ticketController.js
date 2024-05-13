const Ticket = require('../models/ticket');


exports.createTicket = async (req, res) => {
    console.log("Received body:", req.body);
    
    const {
        nomvoyeur,
        telvoyeur,
        datevoyage,
        lieudepart,
        lieudestination,
        idSociete,
        idBus,
        idligne,
        isbuy
    } = req.body;

    console.log(nomvoyeur, telvoyeur, datevoyage, lieudepart, lieudestination, idSociete, idBus, idligne, isbuy);

    if (!nomvoyeur || !telvoyeur || !datevoyage) {
        return res.status(400).send("Champs requis manquants");
    }

    try {
        const result = await Ticket.createTicket({
            nomvoyeur,
            telvoyeur,
            datevoyage,
            lieudepart,
            lieudestination,
            idSociete,
            idBus,
            idligne,
            isbuy
        });
        res.status(201).send({ message: "Ticket créé avec succès!", ticketId: result });
    } catch (error) {
        console.error("Erreur lors de la création du ticket :", error);
        res.status(500).send("Erreur lors de la création du ticket : " + error.message);
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

/* exports.updateTicket = async (req, res) => {
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
}; */

exports.updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const affectedRows = await Ticket.updateTicket(id, updates);
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


