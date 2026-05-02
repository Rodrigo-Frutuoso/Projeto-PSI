const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const authMiddleware = require('../middleware/auth');
const { makeAccentIgnoredRegex, matchesWordPrefix } = require('../utils/searchHelpers');

router.get('/', authMiddleware, async (req, res) => {
    try {
        const searchQuery = (req.query.search || '').trim();
        let queryRegex = {};
        
        if (searchQuery) {
            const searchPattern = makeAccentIgnoredRegex(searchQuery);
            queryRegex = { name: { $regex: `(^|\\s)${searchPattern}`, $options: 'i' } };
        }

        const artists = await Artist.find(queryRegex)
            .sort({ name: 1 })
            .limit(searchQuery ? 50 : 100); 

        const filteredArtists = searchQuery
            ? artists.filter((artist) => matchesWordPrefix(artist.name, searchQuery))
            : artists;

        res.status(200).json(filteredArtists);

    } catch (error) {
        console.error('Erro na pesquisa de artistas:', error);
        res.status(500).json({ message: 'Ocorreu um erro ao pesquisar os artistas.' });
    }
});


router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id).select('name startYear isni imageUrl');
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
