const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const authMiddleware = require('../middleware/auth');

// Funcionalidade para converter query com/sem acentos numa regex universal
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

const normalizeSearchText = (text) => (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
    
const matchesArtistWordPrefix = (artistName, searchQuery) => {
    const normalizedQuery = normalizeSearchText(searchQuery);
    if (!normalizedQuery) return false;

    return normalizeSearchText(artistName)
        .split(/\s+/)
        .some((word) => word.startsWith(normalizedQuery));
};

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
            .limit(searchQuery ? 20 : 5); // Se pesquisa vazia (recomendações), mostra apenas 5 aleatórios ou 5 primeiros

        const filteredArtists = searchQuery
            ? artists.filter((artist) => matchesArtistWordPrefix(artist.name, searchQuery))
            : artists;

        res.status(200).json(filteredArtists);

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
