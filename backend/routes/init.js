const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

router.get('/', async (req, res) => {
    try {
        const countAntes = await Artist.countDocuments();
        if (countAntes > 0) {
            return res.status(400).json({
                message: 'A Base de Dados já tem artistas inseridos.',
                total_artistas: countAntes
            });
        }

        const artistasTeste = [
            { name: 'Radiohead', startYear: 1985, isni: '0000000115264296', artistType: 'group', members: [] },
            { name: 'The Beatles', startYear: 1960, isni: '0000000121707484', artistType: 'group', members: [] },
            { name: 'Ornatos Violeta', startYear: 1991, isni: '0000000105374567', artistType: 'group', members: [] },
            { name: 'António Variações', startYear: 1978, isni: '0000000080608544', artistType: 'solo', members: [] },
            { name: 'Papa Roach', startYear: 1993, isni: '0000000115041071', artistType: 'group', members: [] }
        ];

        await Artist.insertMany(artistasTeste);
        const countDepois = await Artist.countDocuments();

        res.status(201).json({
            message: 'Artistas inseridos de exemplo com sucesso!',
            total_inseridos: countDepois
        });

    } catch (error) {
        console.error('Erro na inicialização de testes:', error);
        res.status(500).json({ message: 'Erro interno ao colocar dados de teste.' });
    }
});

module.exports = router;
