const express = require('express');
const router = express.Router();
const CustomList = require('../models/CustomList');
const authMiddleware = require('../middleware/auth');

// POST /api/custom-lists — Criar uma nova lista personalizada
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name } = req.body;

        // Validar que o nome foi fornecido
        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'O nome da lista é obrigatório.' });
        }

        const trimmedName = name.trim();

        // Validar limite de 100 carateres
        if (trimmedName.length > 100) {
            return res.status(400).json({ message: 'O nome da lista não pode exceder 100 carateres.' });
        }

        // Verificar se já existe uma lista com o mesmo nome para este utilizador
        const existing = await CustomList.findOne({ user: req.userId, name: trimmedName });
        if (existing) {
            return res.status(409).json({ message: 'Já existe uma lista com este nome.' });
        }

        const newList = new CustomList({
            user: req.userId,
            name: trimmedName,
            albums: []
        });

        await newList.save();

        res.status(201).json({
            message: 'Lista personalizada criada com sucesso!',
            list: {
                id: newList._id,
                name: newList.name,
                albumCount: 0,
                updatedAt: newList.updatedAt
            }
        });

    } catch (error) {
        console.error('Erro ao criar lista personalizada:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Já existe uma lista com este nome.' });
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ message: messages.join(' ') });
        }
        res.status(500).json({ message: 'Erro ao criar a lista personalizada.' });
    }
});

// GET /api/custom-lists — Listar todas as listas personalizadas do utilizador
router.get('/', authMiddleware, async (req, res) => {
    try {
        const lists = await CustomList.find({ user: req.userId })
            .sort({ updatedAt: -1 });

        const result = lists.map(list => ({
            id: list._id,
            name: list.name,
            albumCount: list.albums.length,
            updatedAt: list.updatedAt
        }));

        res.status(200).json(result);

    } catch (error) {
        console.error('Erro ao obter listas personalizadas:', error);
        res.status(500).json({ message: 'Erro ao obter as listas personalizadas.' });
    }
});

module.exports = router;
