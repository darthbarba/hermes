require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use(session({
  secret: process.env.SESSION_SECRET || 'hermes_secreto123',
  resave: false,
  saveUninitialized: false
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


require('./config/db');

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/pedidos', require('./routes/pedidos.routes'));
app.use('/api/servicios', require('./routes/servicios.routes'));
app.use('/api/direcciones', require('./routes/direcciones.routes'));


app.use('/', require('./routes/pages.routes'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`corriendo en http://localhost:${PORT}`);
});
