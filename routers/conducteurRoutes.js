const express = require('express');
const router = express.Router();
const conducteurController = require('../controllers/conducteurController');

router.post('/', conducteurController.createConducteur);
router.get('/', conducteurController.getAllConducteurs);
router.get('/:id', conducteurController.getConducteurById);
router.put('/:id', conducteurController.updateConducteur);
router.delete('/:id', conducteurController.deleteConducteur);

module.exports = router;
