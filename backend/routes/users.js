const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// GET /api/users/profile - Obter perfil do utilizador autenticado
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password -__v');

    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }

    // TODO: Quando o modelo Artist existir (US6/7), fazer populate do favoriteArtist
    // Por agora, retornar null já que o modelo Artist ainda não foi criado
    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        favoriteArtist: null
      }
    });
  } catch (err) {
    console.error('Erro ao obter perfil:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;
