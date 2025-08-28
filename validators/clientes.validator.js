const { body } = require('express-validator');

const clienteValidator = [
  body('nombre').notEmpty().withMessage('nombre obligatorio'),
  body('dni').optional().isLength({ min: 6 }).withMessage('DNI inválido'),
  body('instagram').optional().isString(),
  body('telefono').optional().isString()
];
module.exports = clienteValidator;
