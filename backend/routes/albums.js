const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const authMiddleware = require('../middleware/auth');

// Utilitários de pesquisa (igual ao artists.js)
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const makeAccentIgnoredRegex = (text) => {
    let escaped = escapeRegExp(text);
    return escaped
        .replace(/[aáàãâäAÁÀÃÂÄ]/g, '[aáàãâäAÁÀÃÂÄ]')
        .replace(/[eéèêëEÉÈÊË]/g, '[eéèêëEÉÈÊË]')
        .replace(/[iíìîïIÍÌÎÏ]/g, '[iíìîïIÍÌÎÏ]')
        .replace(/[oóòõôöOÓÒÕÔÖ]/g, '[oóòõôöOÓÒÕÔÖ]')
        .replace(/[uúùûüUÚÙÛÜ]/g, '[uúùûüUÚÙÛÜ]')
        .replace(/[cçCÇ]/g, '[cçCÇ]')
        .replace(/[nñNÑ]/g, '[nñNÑ]');
};

// GET /api/albums?search=<query>
// Pesquisa álbuns cujo título corresponde parcialmente ao termo pesquisado
router.get('/', authMiddleware, async (req, res) => {
    try {
        const searchQuery = (req.query.search || '').trim();
        let queryFilter = {};

        if (searchQuery) {
            const searchPattern = makeAccentIgnoredRegex(searchQuery);
            queryFilter = { title: { $regex: searchPattern, $options: 'i' } };
        }

        const albums = await Album.find(queryFilter)
            .populate('artista', 'name')
            .select('title releaseYear albumType mbid artista')
            .sort({ title: 1 })
            .limit(searchQuery ? 20 : 5);

        res.status(200).json(albums);

    } catch (error) {
        console.error('Erro na pesquisa de álbuns:', error);
        res.status(500).json({ message: 'Ocorreu um erro ao pesquisar os álbuns.' });
    }
});

// GET /api/albums/:id — detalhes de um álbum
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate('artista', 'name');
        if (!album) return res.status(404).json({ message: 'Álbum não encontrado.' });
        res.status(200).json(album);
    } catch (error) {
        console.error('Erro ao obter álbum:', error);
        res.status(500).json({ message: 'Erro a obter dados do álbum.' });
    }
});

module.exports = router;
