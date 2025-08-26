const express = require('express');
const router = express.Router();

const pedidosController = require('../controllers/pedidos.controller');
const pedidoValidator = require('../validators/pedidos.validator');
const validate = require('../middlewares/validate.middleware');
const verifyToken = require('../middlewares/auth.middleware');

router.use(verifyToken);


router.get('/', pedidosController.getAll);
router.get('/:id', pedidosController.getById);
router.post('/', pedidoValidator, validate, pedidosController.create);
router.put('/:id', pedidoValidator, validate, pedidosController.update);

router.get('/cliente/:id_cliente', pedidosController.getByCliente);
router.get('/fechas/rango', pedidosController.getByFecha);
router.get('/:id/detalle', pedidosController.getDetallesCompletos);

router.get('/dashboard-data', pedidosController.getDashboardData);
router.get('/programados/listado', pedidosController.getProgramados);
router.get('/dashboard', pedidosController.renderDashboard);
router.get('/programados', pedidosController.renderProgramados);

module.exports = router;
