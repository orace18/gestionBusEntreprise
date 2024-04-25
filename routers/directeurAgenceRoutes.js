const express = require('express');
const router = express.Router();

const directeurAgenceController = require('../controllers/directeurController');

router.get('/', directeurAgenceController.getAllDirecteurs);
router.get('/:id', directeurAgenceController.getDirecteurById);
router.post('/', directeurAgenceController.createDirecteur);
router.put('/:id', directeurAgenceController.updateDirecteur);
router.delete('/:id', directeurAgenceController.deleteDirecteur);

module.exports = router;
