const db = require('../config/db');

const Pedido = {

  
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM pedidos');
    return rows;
  },

  async getById(id_pedido) {
    const [rows] = await db.execute('SELECT * FROM pedidos WHERE id_pedido = ?', [id_pedido]);
    return rows[0];
  },

  async getByCliente(id_cliente) {
    const [rows] = await db.execute('SELECT * FROM pedidos WHERE id_cliente = ?', [id_cliente]);
    return rows;
  },

  async getByTramite(id_servicio) {
    const [rows] = await db.execute('SELECT * FROM pedidos WHERE id_servicio = ?', [id_servicio]);
    return rows;
  },

  // filtro x estado
  async getByEstado(estado) {
    const [rows] = await db.execute('SELECT * FROM pedidos WHERE estado = ?', [estado]);
    return rows;
  },

  // filtro x fechjas
  async getByFecha(desde, hasta) {
    const [rows] = await db.execute(
      'SELECT * FROM pedidos WHERE created_at BETWEEN ? AND ?',
      [desde, hasta]
    );
    return rows;
  },

  async create(data) {
  const {
    id_cliente,
    id_servicio,
    costo_servicio,
    lleva_dinero,
    monto_dinero_llevado
  } = data;

  const [result] = await db.execute(
    `INSERT INTO pedidos (
      id_cliente, id_servicio, costo_servicio, lleva_dinero, monto_dinero_llevado
    ) VALUES (?, ?, ?, ?, ?)`,
    [
      id_cliente,
      id_servicio,
      costo_servicio,
      lleva_dinero,
      monto_dinero_llevado
    ]
  );
  return result.insertId;
},

async update(id_pedido, data) {
  const {
    id_cliente,
    id_servicio,
    costo_servicio,
    lleva_dinero,
    monto_dinero_llevado
  } = data;

  await db.execute(
    `UPDATE pedidos SET 
      id_cliente = ?, id_servicio = ?, 
      costo_servicio = ?, lleva_dinero = ?, monto_dinero_llevado = ?
     WHERE id_pedido = ?`,
    [
      id_cliente,
      id_servicio,
      costo_servicio,
      lleva_dinero,
      monto_dinero_llevado,
      id_pedido
    ]
  );
},

async getDetallesCompletos(id_pedido) {
  const [rows] = await db.execute(`
    SELECT p.*, c.nombre AS cliente_nombre, s.nombre AS servicio_nombre 
    FROM pedidos p
    JOIN clientes c ON p.id_cliente = c.id_cliente
    JOIN servicios s ON p.id_servicio = s.id_servicio
    WHERE p.id_pedido = ?
  `, [id_pedido]);
  return rows[0];
},

//esto es para metricas que se me ocurrio agregar 
async getDashboardStats() {
  const [[{ total_pedidos }]] = await db.execute('SELECT COUNT(*) AS total_pedidos FROM pedidos');
  const [[{ pedidos_hoy }]] = await db.execute('SELECT COUNT(*) AS pedidos_hoy FROM pedidos WHERE DATE(created_at) = CURDATE()');
  const [[{ monto_total }]] = await db.execute('SELECT SUM(costo_servicio) AS monto_total FROM pedidos');
  const [[{ servicios_diferentes }]] = await db.execute('SELECT COUNT(DISTINCT id_servicio) AS servicios_diferentes FROM pedidos');

  return { total_pedidos, pedidos_hoy, monto_total, servicios_diferentes };
},

async getPedidosPorServicio() {
  const [rows] = await db.execute(`
    SELECT s.nombre AS servicio, COUNT(*) AS cantidad
    FROM pedidos p
    JOIN servicios s ON p.id_servicio = s.id_servicio
    GROUP BY s.nombre
  `);
  return rows;
},

async getPedidosPorSemana() {
  const [rows] = await db.execute(`
    SELECT 
      WEEK(created_at) AS semana,
      COUNT(*) AS cantidad
    FROM pedidos
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
    GROUP BY WEEK(created_at)
    ORDER BY semana
  `);
  return rows;
},
async getProgramados() {
  const [rows] = await db.execute(`
    SELECT p.*, c.nombre AS cliente_nombre, s.nombre AS servicio_nombre, p.fecha_programada
    FROM pedidos p
    JOIN clientes c ON p.id_cliente = c.id_cliente
    JOIN servicios s ON p.id_servicio = s.id_servicio
    WHERE p.fecha_programada IS NOT NULL AND p.fecha_programada > NOW()
    ORDER BY p.fecha_programada ASC
  `);
  return rows;
},

};

module.exports = Pedido;
