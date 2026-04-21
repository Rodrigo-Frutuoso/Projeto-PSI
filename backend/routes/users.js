const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Artist = require('../models/Artist');
const authMiddleware = require('../middleware/auth');

// GET /api/users/profile - Obter perfil do utilizador autenticado
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('favoriteArtist', 'name isni')
      .select('-password -__v');

    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        favoriteArtist: user.favoriteArtist
          ? {
            id: user.favoriteArtist._id,
            name: user.favoriteArtist.name,
            isni: user.favoriteArtist.isni
          }
          : null
      }
    });
  } catch (err) {
    console.error('Erro ao obter perfil:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// PUT /api/users/favorite-artist/:artistId - Definir artista favorito
router.put('/favorite-artist/:artistId', authMiddleware, async (req, res) => {
  try {
    const { artistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({ message: 'ID de artista inválido.' });
    }

    const user = await User.findById(req.userId).select('favoriteArtist');
    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }

    const artist = await Artist.findById(artistId).select('name isni');
    if (!artist) {
      return res.status(404).json({ message: 'Artista não encontrado.' });
    }

    if (user.favoriteArtist && user.favoriteArtist.toString() === artistId) {
      return res.status(400).json({
        message: 'Este artista já está definido como favorito.'
      });
    }

    if (user.favoriteArtist && user.favoriteArtist.toString() !== artistId) {
      return res.status(400).json({
        message: 'Já tens outro artista favorito. Remove o atual.'
      });
    }

    user.favoriteArtist = artist._id;
    await user.save();

    return res.status(200).json({
      message: 'Artista adicionado aos favoritos com sucesso!',
      favoriteArtist: {
        id: artist._id,
        name: artist.name,
        isni: artist.isni
      }
    });
  } catch (err) {
    console.error('Erro ao adicionar artista favorito:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// DELETE /api/users/favorite-artist/:artistId - Remover artista favorito
router.delete('/favorite-artist/:artistId', authMiddleware, async (req, res) => {
  try {
    const { artistId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({ message: 'ID de artista inválido.' });
    }

    const user = await User.findById(req.userId).select('favoriteArtist');
    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }

    if (!user.favoriteArtist) {
      return res.status(400).json({
        message: 'Não tens nenhum artista favorito definido.'
      });
    }

    if (user.favoriteArtist.toString() !== artistId) {
      return res.status(400).json({
        message: 'O artista indicado não está definido como favorito.'
      });
    }

    user.favoriteArtist = null;
    await user.save();

    return res.status(200).json({
      message: 'Artista removido dos favoritos com sucesso!'
    });
  } catch (err) {
    console.error('Erro ao remover artista favorito:', err);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// PUT /api/users/profile - Atualizar perfil do utilizador autenticado
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { username, email, newPassword, dateOfBirth, currentPassword } = req.body;
    const errors = [];

    // A palavra-passe atual é sempre obrigatória para qualquer alteração
    if (!currentPassword) {
      return res.status(400).json({
        message: 'A palavra-passe atual é obrigatória para alterar o perfil.',
        errors: ['A palavra-passe atual é obrigatória.']
      });
    }

    // Buscar o utilizador com a password
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilizador não encontrado.' });
    }

    // Verificar a palavra-passe atual
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Palavra-passe atual incorreta.',
        errors: ['A palavra-passe atual está incorreta.']
      });
    }

    // Validar username (se fornecido e diferente do atual)
    if (username !== undefined && username !== user.username) {
      if (!username || username.trim() === '') {
        errors.push('O nome de utilizador é obrigatório.');
      } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
        errors.push('O nome de utilizador só pode conter letras e dígitos.');
      } else {
        const existingUser = await User.findOne({ username, _id: { $ne: req.userId } });
        if (existingUser) {
          errors.push('O nome de utilizador já está em uso.');
        }
      }
    }

    // Validar email (se fornecido e diferente do atual)
    if (email !== undefined && email.toLowerCase() !== user.email) {
      if (!email || email.trim() === '') {
        errors.push('O e-mail é obrigatório.');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('O formato do e-mail é inválido.');
      } else {
        const existingEmail = await User.findOne({ email: email.toLowerCase(), _id: { $ne: req.userId } });
        if (existingEmail) {
          errors.push('O e-mail já está em uso.');
        }
      }
    }

    // Validar nova palavra-passe (se fornecida)
    if (newPassword !== undefined && newPassword !== '') {
      if (newPassword.length < 8) {
        errors.push('A nova palavra-passe deve ter pelo menos 8 carateres.');
      }
      if (!/[A-Z]/.test(newPassword)) {
        errors.push('A nova palavra-passe deve conter pelo menos uma letra maiúscula.');
      }
      if (!/[a-z]/.test(newPassword)) {
        errors.push('A nova palavra-passe deve conter pelo menos uma letra minúscula.');
      }
      if (!/[0-9]/.test(newPassword)) {
        errors.push('A nova palavra-passe deve conter pelo menos um algarismo.');
      }
    }

    // Validar data de nascimento (se fornecida e diferente)
    if (dateOfBirth !== undefined) {
      const birthDate = new Date(dateOfBirth);
      if (isNaN(birthDate.getTime())) {
        errors.push('A data de nascimento é inválida.');
      } else {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 13) {
          errors.push('O utilizador tem de ter pelo menos 13 anos de idade.');
        }
      }
    }

    // Se houver erros, retornar todos
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Erro ao atualizar perfil.', errors });
    }

    // Aplicar alterações
    if (username !== undefined && username !== user.username) {
      user.username = username;
    }
    if (email !== undefined && email.toLowerCase() !== user.email) {
      user.email = email.toLowerCase();
    }
    if (dateOfBirth !== undefined) {
      user.dateOfBirth = new Date(dateOfBirth);
    }
    if (newPassword !== undefined && newPassword !== '') {
      user.password = newPassword; // O pre-save hook faz o hash
    }

    await user.save();

    res.status(200).json({
      message: 'Perfil atualizado com sucesso!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth
      }
    });
  } catch (err) {
    console.error('Erro ao atualizar perfil:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;
