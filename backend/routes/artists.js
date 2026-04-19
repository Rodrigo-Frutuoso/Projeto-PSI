const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const searchQuery = req.query.search;
        if (!searchQuery) {
            return res.status(400).json({ message: 'Precisas de fornecer um nome para pesquisar.' });
        }


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


router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id).select('name startYear isni');
        if (!artist) return res.status(404).json({ message: 'Artista não encontrado.' });

        const recentAlbums = await Album.find({ artista: req.params.id })
            .sort({ releaseYear: -1 })
            .limit(5);

        res.status(200).json({ artist, recentAlbums });


    } catch (error) {
        console.error('Erro ao obter perfil do artista:', error);
        res.status(500).json({ message: 'Erro a obter dados do artista.' });
    }
});


router.get('/:id/albums', authMiddleware, async (req, res) => {
    try {
        const artistExists = await Artist.exists({ _id: req.params.id });
        if (!artistExists) return res.status(404).json({ message: 'Artista não encontrado.' });

        const allAlbums = await Album.find({ artista: req.params.id })
            .select('title releaseYear')
            .sort({ releaseYear: 1 });

        res.status(200).json(allAlbums);

    } catch (error) {
        console.error('Erro ao ler discografia:', error);
        res.status(500).json({ message: 'Erro a obter os álbuns do artista.' });
    }
});

module.exports = router;
