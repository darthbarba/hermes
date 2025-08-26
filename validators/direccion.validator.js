const { body } = require('express-validator');

const direccionValidator 

 = [
  body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
  body('descripcion').optional().isString().withMessage('Descripción debe ser texto'),
  body('id_pedido').notEmpty().isInt().withMessage('ID de pedido inválido')
];

module.exports = direccionValidator;

