const { body } = require('express-validator');

const pedidoValidator = [
  body('id_cliente').notEmpty().withMessage('El cliente es obligatorio'),
  body('id_servicio').notEmpty().withMessage('El servicio es obligatorio'),
  body('costo_servicio').isDecimal().withMessage('Costo del servicio inválido'),
  body('lleva_dinero').isBoolean().withMessage('Debe indicar si lleva dinero'),
  body('monto_dinero_llevado')
    .optional()
    .isDecimal().withMessage('Monto inválido'),
];

module.exports = pedidoValidator;

