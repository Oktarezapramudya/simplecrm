const express = require('express');
const app = express();
const sequelize = require('./config/database');
const pelangganRouter = require('./routes/pelanggan');
const Pelanggan = require('./models/pelanggan');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware → HARUS sebelum route!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.authenticate()
  .then(() => console.log('Koneksi berhasil!'))
  .catch(err => console.error('Koneksi gagal:', err));

// Router API
app.use('/pelanggan', pelangganRouter);

// Web routes (untuk EJS)
app.get('/', async (req, res) => {
  const pelanggan = await Pelanggan.findAll();
  res.render('index', { pelanggan });
});

app.get('/tambah', (req, res) => {
  res.render('form', { pelanggan: {}, action: '/tambah', button: 'Tambah' });
});

app.post('/tambah', async (req, res) => {
  await Pelanggan.create(req.body);
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  const pelanggan = await Pelanggan.findByPk(req.params.id);
  res.render('form', { pelanggan, action: `/edit/${pelanggan.id}`, button: 'Update' });
});

app.post('/edit/:id', async (req, res) => {
  const pelanggan = await Pelanggan.findByPk(req.params.id);
  await pelanggan.update(req.body);
  res.redirect('/');
});

app.post('/hapus/:id', async (req, res) => {
  const pelanggan = await Pelanggan.findByPk(req.params.id);
  await pelanggan.destroy();
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server jalan di http://localhost:3000');
});
