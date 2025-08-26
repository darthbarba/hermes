const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.model');

const authController = {
  async register(req, res) {
    const { nombre, email, password, rol } = req.body;

    const existing = await Usuario.findByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'El email ya está registrado' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const id = await Usuario.create({ nombre, email, password: hashed, rol });

    res.status(201).json({ message: 'Usuario registrado', id });
  },

  async login(req, res) {
    const { email, password } = req.body;
    const user = await Usuario.findByEmail(email);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol
      }
    });
  },

  async loginWeb(req, res) {
    const { email, password } = req.body;
    const user = await Usuario.findByEmail(email);

    if (!user) {
      return res.render('login', { error: 'Usuario no encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }

    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    };

    res.redirect('/dashboard');
  }
};

module.exports = authController;