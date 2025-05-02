const express = require('express');
const router = express.Router();
const Pelanggan = require('../models/pelanggan');

// Create
router.post('/', async (req, res) => {
  try {
    const pelanggan = await Pelanggan.create(req.body);
    res.json(pelanggan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read
router.get('/', async (req, res) => {
  const pelanggan = await Pelanggan.findAll();
  res.json(pelanggan);
});

// Update
router.put('/:id', async (req, res) => {
  const pelanggan = await Pelanggan.findByPk(req.params.id);
  if (pelanggan) {
    await pelanggan.update(req.body);
    res.json(pelanggan);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  const pelanggan = await Pelanggan.findByPk(req.params.id);
  if (pelanggan) {
    await pelanggan.destroy();
    res.json({ message: 'Deleted' });
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

module.exports = router;
