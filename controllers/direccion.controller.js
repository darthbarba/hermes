const Direccion = require('../models/direccion.model');

const DireccionController = {
  async create(req, res) {
    const id = await Direccion.create(req.body);
    res.status(201).json({ message: 'Dirección creada', id });
  },

  async getAll(req, res) {
    const direcciones = await Direccion.getAll();
    res.json(direcciones);
  },

  async getByPedido(req, res) {
    const direcciones = await Direccion.getByPedido(req.params.id_pedido);
    res.json(direcciones);
  },


async getById(req, res) {
  const cliente = await Cliente.getById(req.params.id);
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });

  const direcciones = await Direccion.getByClienteId(req.params.id);

  res.render('detallecliente', { cliente, direcciones });
},


  async update(req, res) {
    await Direccion.update(req.params.id_direccion, req.body);
    res.json({ message: 'Dirección actualizada' });
  },

  async delete(req, res) {
    await Direccion.delete(req.params.id_direccion);
    res.json({ message: 'Dirección eliminada' });
  }
};

module.exports = DireccionController;
