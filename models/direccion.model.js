const db = require('../config/db');

const Direccion = {
  async create({ direccion, descripcion, id_pedido }) {
  const [result] = await db.execute(
    'INSERT INTO direcciones (direccion, descripcion, id_pedido) VALUES (?, ?, ?)',
    [direccion, descripcion, id_pedido]
  );
  return result.insertId;
},

  async getAll() {
    const [rows] = await db.execute('SELECT * FROM direcciones');
    return rows;
  },

  
  async getByPedido(id_pedido) {
    const [rows] = await db.execute('SELECT * FROM direcciones WHERE id_pedido = ?', [id_pedido]);
    return rows;
  },

async getByClienteId(id_cliente) {
  const [rows] = await db.execute(
    'SELECT * FROM direcciones WHERE id_cliente = ?',
    [id_cliente]
  );
  return rows;
},

  async getById(id_direccion) {
    const [rows] = await db.execute('SELECT * FROM direcciones WHERE id_direccion = ?', [id_direccion]);
    return rows[0];
  },

  async update(id_direccion, { direccion, descripcion }) {
    await db.execute(
      'UPDATE direcciones SET direccion = ?, descripcion = ? WHERE id_direccion = ?',
      [direccion, descripcion, id_direccion]
    );
  },

  async delete(id_direccion) {
    await db.execute('DELETE FROM direcciones WHERE id_direccion = ?', [id_direccion]);
  }
};

module.exports = Direccion;
