const express = require('express');
const router = express.Router();
const CollectionItem = require('../models/CollectionItem');
const Album = require('../models/Album');
const authMiddleware = require('../middleware/auth');

// GET /api/collection — Listar coleção do utilizador autenticado
router.get('/', authMiddleware, async (req, res) => {
    try {
        const items = await CollectionItem.find({ user: req.userId })
            .populate({
                path: 'album',
                select: 'title releaseYear mbid albumType versions artista',
                populate: {
                    path: 'artista',
                    select: 'name'
                }
            })
            .sort({ addedAt: -1 });

        // Montar resposta com dados da versão embutidos
        const collection = items.map(item => {
            const album = item.album;
            if (!album) return null;

            // Encontrar a versão correspondente ao EAN-13
            const version = album.versions?.find(v => v.ean13 === item.versionEan13);

            return {
                id: item._id,
                albumId: album._id,
                title: album.title,
                releaseYear: album.releaseYear,
                artistName: album.artista?.name || 'Vários artistas',
                ean13: item.versionEan13,
                physicalSupport: version?.physicalSupport || '—',
                designation: version?.designation || null,
                addedAt: item.addedAt
            };
        }).filter(Boolean);

        res.status(200).json(collection);

    } catch (error) {
        console.error('Erro ao obter coleção:', error);
        res.status(500).json({ message: 'Erro ao obter a coleção.' });
    }
});

// POST /api/collection — Adicionar versão de álbum à coleção
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { albumId, versionEan13 } = req.body;

        if (!albumId || !versionEan13) {
            return res.status(400).json({ message: 'O álbum e o EAN-13 da versão são obrigatórios.' });
        }

        // Verificar se o álbum existe e se a versão existe nele
        const album = await Album.findById(albumId);
        if (!album) {
            return res.status(404).json({ message: 'Álbum não encontrado.' });
        }

        const versionExists = album.versions?.some(v => v.ean13 === versionEan13);
        if (!versionExists) {
            return res.status(404).json({ message: 'Versão não encontrada neste álbum.' });
        }

        // Verificar se já existe na coleção
        const existing = await CollectionItem.findOne({ user: req.userId, versionEan13 });
        if (existing) {
            return res.status(409).json({ message: 'Esta versão já se encontra na tua coleção.' });
        }

        const newItem = new CollectionItem({
            user: req.userId,
            album: albumId,
            versionEan13
        });

        await newItem.save();

        res.status(201).json({
            message: 'Versão adicionada à coleção com sucesso!',
            item: {
                id: newItem._id,
                albumId: album._id,
                title: album.title,
                ean13: versionEan13,
                addedAt: newItem.addedAt
            }
        });

    } catch (error) {
        console.error('Erro ao adicionar à coleção:', error);
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Esta versão já se encontra na tua coleção.' });
        }
        res.status(500).json({ message: 'Erro ao adicionar à coleção.' });
    }
});

// DELETE /api/collection/:id — Remover item da coleção
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const item = await CollectionItem.findOne({ _id: req.params.id, user: req.userId });

        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado na coleção.' });
        }

        await CollectionItem.deleteOne({ _id: item._id });

        res.status(200).json({ message: 'Item removido da coleção com sucesso!' });

    } catch (error) {
        console.error('Erro ao remover da coleção:', error);
        res.status(500).json({ message: 'Erro ao remover da coleção.' });
    }
});

module.exports = router;
