const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/auth/register - Criar conta de utilizador
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, dateOfBirth } = req.body;
    const errors = [];

    // Validar campos obrigatórios
    if (!username) errors.push('O nome de utilizador é obrigatório.');
    if (!email) errors.push('O e-mail é obrigatório.');
    if (!password) errors.push('A palavra-passe é obrigatória.');
    if (!dateOfBirth) errors.push('A data de nascimento é obrigatória.');

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Dados inválidos.', errors });
    }

    // Validar formato do nome de utilizador (só letras e dígitos)
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      errors.push('O nome de utilizador só pode conter letras e dígitos.');
    }

    // Validar formato do e-mail
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('O formato do e-mail é inválido.');
    }

    // Validar palavra-passe (8+ carateres, maiúscula, minúscula, dígito)
    if (password.length < 8) {
      errors.push('A palavra-passe deve ter pelo menos 8 carateres.');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('A palavra-passe deve conter pelo menos uma letra maiúscula.');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('A palavra-passe deve conter pelo menos uma letra minúscula.');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('A palavra-passe deve conter pelo menos um algarismo.');
    }

    // Validar idade (pelo menos 13 anos)
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (isNaN(birthDate.getTime())) {
      errors.push('A data de nascimento é inválida.');
    } else if (age < 13) {
      errors.push('O utilizador tem de ter pelo menos 13 anos de idade.');
    }

    // Verificar unicidade do nome de utilizador e e-mail
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      errors.push('O nome de utilizador já está em uso.');
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      errors.push('O e-mail já está em uso.');
    }

    // Se houver erros, retornar todos
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Erro ao criar conta.', errors });
    }

    // Criar o utilizador
    const user = new User({
      username,
      email,
      password,
      dateOfBirth: birthDate
    });

    await user.save();

    res.status(201).json({
      message: 'Conta criada com sucesso!',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth
      }
    });
  } catch (err) {
    console.error('Erro no registo:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

module.exports = router;
