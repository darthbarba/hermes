const express = require('express');
const router = express.Router();
const Cliente = require('../models/clientes.model');
const authController = require('../controllers/auth.controller');

// Login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', authController.loginWeb);

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Dashboard protegido
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
});

// Lista clientes
router.get('/clientes', async (req, res) => {
  const clientes = await Cliente.getAll();
  res.render('listaclientes', { clientes });
});

// Nuevo cliente
router.get('/clientes/nuevo', (req, res) => {
  res.render('cliente-form', { cliente: null, editar: false });
});

// Editar cliente
router.get('/clientes/:id/editar', async (req, res) => {
  const cliente = await Cliente.getById(req.params.id);
  if (!cliente) return res.status(404).send('Cliente no encontrado');
  res.render('cliente-form', { cliente, editar: true });
});

// Detalle cliente
router.get('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.getById(req.params.id);
  if (!cliente) return res.status(404).send('Cliente no encontrado');
  res.render('detallecliente', { cliente });
});

module.exports = router;