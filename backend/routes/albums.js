const express = require('express');
const router = express.Router();
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const VersionRequest = require('../models/VersionRequest');
const authMiddleware = require('../middleware/auth');
const { escapeRegExp, makeAccentIgnoredRegex, normalizeSearchText, matchesWordPrefix } = require('../utils/searchHelpers');

// GET /api/albums?search=<query>
// Pesquisa álbuns cujo título corresponde ao termo pesquisado (início de palavra)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const searchQuery = (req.query.search || '').trim();
        let queryFilter = {};

        if (searchQuery) {
            const searchPattern = makeAccentIgnoredRegex(searchQuery);
            queryFilter = { title: { $regex: `(^|\\s)${searchPattern}`, $options: 'i' } };
        }

        const albums = await Album.find(queryFilter)
            .populate('artista', 'name')
            .select('title releaseYear albumType mbid artista coverImage')
            .sort({ title: 1 })
            .limit(searchQuery ? 50 : 100);

        const filteredAlbums = searchQuery
            ? albums.filter((album) => matchesWordPrefix(album.title, searchQuery))
            : albums;

        res.status(200).json(filteredAlbums);

    } catch (error) {
        console.error('Erro na pesquisa de álbuns:', error);
        res.status(500).json({ message: 'Ocorreu um erro ao pesquisar os álbuns.' });
    }
});

// GET /api/albums/:id — detalhes de um álbum
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const album = await Album.findById(req.params.id)
            .populate('artista', 'name')
            .populate({
                path: 'tracks.song',
                populate: { path: 'artists', select: 'name isni' }
            });
        if (!album) return res.status(404).json({ message: 'Álbum não encontrado.' });
        res.status(200).json(album);
    } catch (error) {
        console.error('Erro ao obter álbum:', error);
        res.status(500).json({ message: 'Erro a obter dados do álbum.' });
    }
});

// POST /api/albums/:id/version-requests - Submeter pedido de nova versão
router.post('/:id/version-requests', authMiddleware, async (req, res) => {
    try {
        const { id: albumId } = req.params;
        const { versionEan13, physicalSupport, designation } = req.body;

        if (!versionEan13 || !physicalSupport) {
            return res.status(400).json({ message: 'O EAN-13 e o suporte físico são obrigatórios.' });
        }

        if (!/^[0-9]{13}$/.test(String(versionEan13))) {
            return res.status(400).json({ message: 'O EAN-13 deve ter exatamente 13 dígitos.' });
        }

        if (!['CD', 'vinil', 'cassete'].includes(physicalSupport)) {
            return res.status(400).json({ message: 'O suporte físico deve ser CD, vinil, ou cassete.' });
        }

        const album = await Album.findById(albumId).select('title versions');
        if (!album) {
            return res.status(404).json({ message: 'Álbum não encontrado.' });
        }

        const versionAlreadyExists = album.versions?.some((version) => version.ean13 === versionEan13);
        if (versionAlreadyExists) {
            return res.status(409).json({ message: 'Essa versão já existe neste álbum.' });
        }

        const alreadyRequested = await VersionRequest.findOne({
            user: req.userId,
            album: albumId,
            versionEan13: String(versionEan13)
        });

        if (alreadyRequested) {
            return res.status(409).json({ message: 'Já submeteste um pedido para esta versão.' });
        }

        const request = new VersionRequest({
            user: req.userId,
            album: albumId,
            versionEan13: String(versionEan13),
            physicalSupport,
            designation: designation?.trim() || null,
            status: 'em análise'
        });

        await request.save();

        return res.status(201).json({
            message: 'Pedido submetido com sucesso. O estado ficou em análise.',
            request: {
                id: request._id,
                albumId: album._id,
                albumTitle: album.title,
                versionEan13: request.versionEan13,
                physicalSupport: request.physicalSupport,
                designation: request.designation,
                status: request.status,
                requestedAt: request.createdAt
            }
        });
    } catch (error) {
        console.error('Erro ao submeter pedido de nova versão:', error);

        if (error.code === 11000) {
            return res.status(409).json({ message: 'Já existe um pedido para esta versão.' });
        }

        return res.status(500).json({ message: 'Erro ao submeter o pedido.' });
    }
});

module.exports = router;
