const express = require('express');
const router = express.Router();
const ligneController = require('../controllers/ligneController');

router.post('/', ligneController.createLigne);
router.get('/', ligneController.getAllLignes);
router.get('/:id', ligneController.getLigneById);
router.put('/:id', ligneController.updateLigne);
router.delete('/:id', ligneController.deleteLigne);

module.exports = router;
