const Servicio = require('../models/servicio.model');

const ServicioController = {
  async getAll(req, res) {
    const data = await Servicio.getAll();
    res.json(data);
  },

  async getById(req, res) {
    const servicio = await Servicio.findById(req.params.id);
    if (!servicio) return res.status(404).json({ message: 'No encontrado' });
    res.json(servicio);
  }
};

module.exports = ServicioController;
