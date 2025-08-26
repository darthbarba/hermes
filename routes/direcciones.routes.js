const express = require('express');
const router = express.Router();
const DireccionController = require('../controllers/direccion.controller');
const direccionValidator = require('../validators/direccion.validator'); 
const validate = require('../middlewares/validate.middleware');
const verifyToken = require('../middlewares/auth.middleware');

router.use(verifyToken);

router.post('/', direccionValidator, validate, DireccionController.create);
router.get('/', DireccionController.getAll);
router.get('/:id_direccion', DireccionController.getById);
router.get('/pedido/:id_pedido', DireccionController.getByPedido);
router.put('/:id_direccion', direccionValidator, validate, DireccionController.update);
router.delete('/:id_direccion', DireccionController.delete);

module.exports = router;
