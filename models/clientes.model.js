const db = require('../config/db');

const Cliente = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM clientes');
    return rows;
  },

  async getById(id_cliente) {
    const [rows] = await db.execute(
      'SELECT * FROM clientes WHERE id_cliente = ?',
      [id_cliente]
    );
    return rows[0];
  },

  async search(query) {
    const [rows] = await db.execute(
      `SELECT * FROM clientes 
       WHERE nombre LIKE ? OR instagram LIKE ?`,
      [`%${query}%`, `%${query}%`]
    );
    return rows;
  },

  async create({ nombre, dni, email, instagram, telefono }) {
    const [result] = await db.execute(
      `INSERT INTO clientes (nombre, dni, email, instagram, telefono)
 VALUES (?, ?, ?, ?, ?)`,

      [nombre, dni, email, instagram, telefono]
    );
    return result.insertId;
  },

  async update(id_cliente, { nombre, dni, email, instagram, telefono }) {
    await db.execute(
      `UPDATE clientes SET nombre = ?, dni = ?, instagram = ?, telefono = ?
       WHERE id_cliente = ?`,
      [nombre, dni, email, instagram, telefono, id_cliente]
    );
  },

async findByUniqueFields({ instagram }) {
  const [rows] = await db.execute(
    `SELECT * FROM clientes WHERE instagram = ? LIMIT 1`,
    [instagram]
  );
  return rows[0];
}



};



module.exports = Cliente;
