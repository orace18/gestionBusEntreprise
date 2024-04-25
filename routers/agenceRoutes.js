const express = require('express');
const router = express.Router();
const agenceController = require('../controllers/agenceController');

router.post('/', agenceController.createAgence);
router.get('/', agenceController.getAllAgences);
router.get('/:id', agenceController.getAgenceById);
router.put('/:id', agenceController.updateAgence);
router.delete('/:id', agenceController.deleteAgence);

module.exports = router;
