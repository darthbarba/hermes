const Pedido = require('../models/pedidos.model');

const pedidosController = {
  async getAll(req, res) {
    const pedidos = await Pedido.getAll();
    res.json(pedidos);
  },

  async getById(req, res) {
    const pedido = await Pedido.getById(req.params.id);
    if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });
    res.json(pedido);
  },

  async getByCliente(req, res) {
    const pedidos = await Pedido.getByCliente(req.params.id_cliente);
    res.json(pedidos);
  },

  async getByFecha(req, res) {
    const { desde, hasta } = req.query;
    if (!desde || !hasta) {
      return res.status(400).json({ message: 'Faltan parámetros de fecha' });
    }
    const pedidos = await Pedido.getByFecha(desde, hasta);
    res.json(pedidos);
  },

  async create(req, res) {
    const id = await Pedido.create(req.body);
    res.status(201).json({ message: 'Pedido creado', id });
  },

  async update(req, res) {
    await Pedido.update(req.params.id, req.body);
    res.json({ message: 'Pedido actualizado' });
  },

  async getDetallesCompletos(req, res) {
    try {
      const pedido = await Pedido.getDetallesCompletos(req.params.id);
      if (!pedido) return res.status(404).json({ message: 'Pedido no encontrado' });
      res.json(pedido);
    } catch (error) {
      res.status(500).json({ message: 'Error interno', error: error.message });
    }
  },

  async getProgramados(req, res) {
    try {
      const pedidos = await Pedido.getProgramados();
      res.json(pedidos);
    } catch (error) {
      res.status(500).send('Error al cargar pedidos programados');
    }
  },

  async renderDashboard(req, res) {
    try {
      const kpis = await Pedido.getDashboardStats();
      const porServicio = await Pedido.getPedidosPorServicio();
      const porSemana = await Pedido.getPedidosPorSemana();
      res.render('dashboard', { kpis, porServicio, porSemana });
    } catch (err) {
      res.status(500).send('Error al cargar el dashboard');
    }
  },

  async getDashboardData(req, res) {
    try {
      const kpis = await Pedido.getDashboardStats();
      const porServicio = await Pedido.getPedidosPorServicio();
      const porSemana = await Pedido.getPedidosPorSemana();

      res.json({ kpis, porServicio, porSemana });
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener datos del dashboard', error: err.message });
    }
  },

  async renderProgramados(req, res) {
    try {
      const pedidos = await Pedido.getProgramados();
      res.render('programados', { pedidos });
    } catch (err) {
      res.status(500).send('Error al cargar pedidos programados');
    }
  }
};

module.exports = pedidosController;
