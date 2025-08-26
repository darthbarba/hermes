const db = require('../config/db');

const Servicio = {
  async getAll() {
    const [rows] = await db.execute('SELECT * FROM servicios');
    return rows;
  },

  async findById(id) {
    const [rows] = await db.execute('SELECT * FROM servicios WHERE id_servicio = ?', [id]);
    return rows[0];
  },

};

module.exports = Servicio;
