const express = require('express');
const router = express.Router();
const { seedTestData } = require('../services/seedData');

router.get('/', async (req, res) => {
    try {
        const seedResult = await seedTestData();

        if (seedResult.alreadySeeded) {
            return res.status(400).json({
                message: 'A base de dados já está populada com artistas e álbuns.'
            });
        }

        res.status(201).json({
            message: 'Artistas e Álbuns injetados na Base de Dados com sucesso!',
            insertedArtists: seedResult.insertedArtists,
            insertedAlbums: seedResult.insertedAlbums
        });

    } catch (error) {
        console.error('Erro na inicialização de testes:', error);
        res.status(500).json({ message: 'Erro interno ao colocar dados de teste.' });
    }
});

module.exports = router;
