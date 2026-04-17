const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const searchQuery = req.query.search;
        if (!searchQuery) {
            return res.status(400).json({ message: 'Precisas de fornecer um nome para pesquisar.' });
        }

        // $regex: faz pesquisa parcial. $options: 'i' ignora se é maiúscula ou minúscula
        const artists = await Artist.find({
            name: { $regex: searchQuery, $options: 'i' }
        })
            .sort({ name: 1 })
            .limit(20);

        res.status(200).json(artists);

    } catch (error) {
        console.error('Erro na pesquisa de artistas:', error);
        res.status(500).json({ message: 'Ocorreu um erro ao pesquisar os artistas.' });
    }
});

module.exports = router;
