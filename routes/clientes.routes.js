const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');
const verifyToken = require('../middlewares/auth.middleware');
const clienteValidator = require('../validators/clientes.validator');
const validate = require('../middlewares/validate.middleware');
const Cliente = require('../models/clientes.model');

router.use(verifyToken);

router.get('/buscar', clientesController.search);
router.get('/', clientesController.getAll);
router.get('/:id', clientesController.getById);
router.post('/', clienteValidator, validate, clientesController.create);
router.put('/:id', clienteValidator, validate, clientesController.update);


router.get('/form/nuevo', (req, res) => {
  res.render('crearcliente', { cliente: {}, editar: false });
});


router.get('/form/editar/:id', async (req, res) => {
  const cliente = await Cliente.getById(req.params.id);
  if (!cliente) return res.status(404).send('Cliente no encontrado');
  res.render('crearcliente', { cliente, editar: true });
});

module.exports = router;
