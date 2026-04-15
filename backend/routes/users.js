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
