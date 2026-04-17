const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registar rotas aqui
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/artists', require('./routes/artists'));
// app.use('/api/albums', require('./routes/albums'));
// app.use('/api/init', require('./routes/init'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

// Ligar ao MongoDB e iniciar o servidor
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/psi-music-collection';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Ligado ao MongoDB com sucesso');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor a correr em http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao ligar ao MongoDB:', err.message);
    process.exit(1);
  });

module.exports = app;
