const express = require('express');
const router = express.Router();
const ServicioController = require('../controllers/servicio.controller');

const validate = require('../middlewares/validate.middleware');
const verifyToken = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.get('/', ServicioController.getAll);
router.get('/:id', ServicioController.getById);

module.exports = router;
