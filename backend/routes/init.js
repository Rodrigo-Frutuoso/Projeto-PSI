const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');

router.get('/', async (req, res) => {
    try {
        const artistasCount = await Artist.countDocuments();
        const albunsCount = await Album.countDocuments();

        if (artistasCount > 0 && albunsCount > 0) {
            return res.status(400).json({
                message: 'A base de dados já está populada com artistas e álbuns.'
            });
        }

        if (artistasCount === 0) {
            const artistasTeste = [
                { name: 'Radiohead', startYear: 1985, isni: '0000000115264296', artistType: 'group', members: [] },
                { name: 'The Beatles', startYear: 1960, isni: '0000000121707484', artistType: 'group', members: [] },
                { name: 'Ornatos Violeta', startYear: 1991, isni: '0000000105374567', artistType: 'group', members: [] },
                { name: 'António Variações', startYear: 1978, isni: '0000000080608544', artistType: 'solo', members: [] },
                { name: 'Papa Roach', startYear: 1993, isni: '0000000115041071', artistType: 'group', members: [] }
            ];
            await Artist.insertMany(artistasTeste);
        }

        if (albunsCount === 0) {
            const rh = await Artist.findOne({ name: 'Radiohead' });
            const bt = await Artist.findOne({ name: 'The Beatles' });
            const pR = await Artist.findOne({ name: 'Papa Roach' });

            const albunsTeste = [
                { mbid: 'ddacdf34-2e2d-4d7a-af37-56e632d4b998', title: 'OK Computer', releaseYear: 1997, albumType: 'LP', artista: rh ? rh._id : null },
                { mbid: 'c2eaf764-ca57-4180-b2f5-b6d8f1e5fb06', title: 'Kid A', releaseYear: 2000, albumType: 'LP', artista: rh ? rh._id : null },
                { mbid: '488582ba-c69e-4eec-b530-5bfa2ab8f731', title: 'Creep', releaseYear: 1992, albumType: 'single', artista: rh ? rh._id : null },
                { mbid: 'd22d25f7-fdfa-4fc8-9fce-e0c65df5af9c', title: 'Abbey Road', releaseYear: 1969, albumType: 'LP', artista: bt ? bt._id : null },
                { mbid: '64e32095-d24b-4ec5-bc16-6701509930f9', title: 'Let It Be', releaseYear: 1970, albumType: 'LP', artista: bt ? bt._id : null },
                { mbid: '2bb5e8fc-f5b2-4d14-8742-1e9bf478635d', title: 'Infest', releaseYear: 2000, albumType: 'LP', artista: pR ? pR._id : null },
                { mbid: 'a1b2c3d4-e5f6-7890-1234-56789abcdef0', title: 'Now 4', releaseYear: 1999, albumType: 'LP' }
            ];
            await Album.insertMany(albunsTeste);
        }

        res.status(201).json({ message: 'Artistas e Álbuns injetados na Base de Dados com sucesso!' });

    } catch (error) {
        console.error('Erro na inicialização de testes:', error);
        res.status(500).json({ message: 'Erro interno ao colocar dados de teste.' });
    }
});

module.exports = router;
