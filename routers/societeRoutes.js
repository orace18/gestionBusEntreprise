const express = require('express');
const router = express.Router();
const societeController = require('../controllers/societeController');

router.post('/', societeController.createSociete);
router.get('/', societeController.getAllSocietes);
router.get('/:id', societeController.getSocieteById);
router.put('/:id', societeController.updateSociete);
router.delete('/:id', societeController.deleteSociete);

module.exports = router;
