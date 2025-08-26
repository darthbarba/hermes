const Cliente = require('../models/clientes.model');

const clientesController = {
  async getAll(req, res) {
    const clientes = await Cliente.getAll();
    res.json(clientes);
  },

  async search(req, res) {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Falta parámetro de búsqueda' });
    const results = await Cliente.search(q);
    res.json(results);
  },

  async getById(req, res) {
    const cliente = await Cliente.getById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  },

  async create(req, res) {
    const id = await Cliente.create(req.body);
    res.status(201).json({ message: 'Cliente creado', id });
  },

  async update(req, res) {
    await Cliente.update(req.params.id, req.body);
    res.json({ message: 'Cliente actualizado' });
  }
};

module.exports = clientesController;
