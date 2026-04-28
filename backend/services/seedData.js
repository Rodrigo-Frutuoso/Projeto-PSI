const Artist = require('../models/Artist');
const Album = require('../models/Album');

const TEST_ARTISTS = [
  { name: 'Radiohead', startYear: 1985, isni: '0000000115264296', artistType: 'group', members: [] },
  { name: 'The Beatles', startYear: 1960, isni: '0000000121707484', artistType: 'group', members: [] },
  { name: 'Ornatos Violeta', startYear: 1991, isni: '0000000105374567', artistType: 'group', members: [] },
  { name: 'António Variações', startYear: 1978, isni: '0000000080608544', artistType: 'solo', members: [] },
  { name: 'Papa Roach', startYear: 1993, isni: '0000000115041071', artistType: 'group', members: [] },
  { name: 'Quim Barreiros', startYear: 1971, isni: '0000000199001001', artistType: 'solo', members: [] },
  { name: 'Amália Rodrigues', startYear: 1939, isni: '0000000199001002', artistType: 'solo', members: [] },
  { name: 'Xutos & Pontapés', startYear: 1978, isni: '0000000199001003', artistType: 'group', members: [] },
  { name: 'GNR', startYear: 1980, isni: '0000000199001004', artistType: 'group', members: [] },
  { name: 'Rui Veloso', startYear: 1980, isni: '0000000199001005', artistType: 'solo', members: [] },
  { name: 'Madredeus', startYear: 1985, isni: '0000000199001006', artistType: 'group', members: [] }
];

const TEST_ALBUMS = [
  // --- Radiohead ---
  { mbid: 'a1b2c3d4-0001-0001-0001-000000000001', title: 'Pablo Honey', releaseYear: 1993, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'a1b2c3d4-0001-0001-0001-000000000002', title: 'The Bends', releaseYear: 1995, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'ddacdf34-2e2d-4d7a-af37-56e632d4b998', title: 'OK Computer', releaseYear: 1997, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'c2eaf764-ca57-4180-b2f5-b6d8f1e5fb06', title: 'Kid A', releaseYear: 2000, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'a1b2c3d4-0001-0001-0001-000000000003', title: 'Amnesiac', releaseYear: 2001, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'a1b2c3d4-0001-0001-0001-000000000004', title: 'Hail to the Thief', releaseYear: 2003, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'a1b2c3d4-0001-0001-0001-000000000005', title: 'In Rainbows', releaseYear: 2007, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'a1b2c3d4-0001-0001-0001-000000000006', title: 'The King of Limbs', releaseYear: 2011, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'a1b2c3d4-0001-0001-0001-000000000007', title: 'A Moon Shaped Pool', releaseYear: 2016, albumType: 'LP', artistName: 'Radiohead' },

  // --- The Beatles ---
  { mbid: 'd22d25f7-fdfa-4fc8-9fce-e0c65df5af9c', title: 'Please Please Me', releaseYear: 1963, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000001', title: 'With The Beatles', releaseYear: 1963, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000002', title: 'A Hard Day\'s Night', releaseYear: 1964, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000003', title: 'Beatles For Sale', releaseYear: 1964, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000004', title: 'Help!', releaseYear: 1965, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000005', title: 'Rubber Soul', releaseYear: 1965, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000006', title: 'Revolver', releaseYear: 1966, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000007', title: 'Sgt. Pepper\'s Lonely Hearts Club Band', releaseYear: 1967, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000008', title: 'Magical Mystery Tour', releaseYear: 1967, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000009', title: 'The Beatles (White Album)', releaseYear: 1968, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000010', title: 'Yellow Submarine', releaseYear: 1969, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: 'a1b2c3d4-0002-0002-0002-000000000011', title: 'Abbey Road', releaseYear: 1969, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: '64e32095-d24b-4ec5-bc16-6701509930f9', title: 'Let It Be', releaseYear: 1970, albumType: 'LP', artistName: 'The Beatles' },

  // --- Ornatos Violeta ---
  { mbid: 'a1b2c3d4-e5f6-7890-1234-56789abcdef1', title: 'Cão!', releaseYear: 1997, albumType: 'LP', artistName: 'Ornatos Violeta' },
  { mbid: 'a1b2c3d4-0003-0003-0003-000000000001', title: 'O Monstro Precisa de Amigos', releaseYear: 1999, albumType: 'LP', artistName: 'Ornatos Violeta' },

  // --- António Variações ---
  { mbid: 'a1b2c3d4-e5f6-7890-1234-56789abcdef2', title: 'Dar & Receber', releaseYear: 1984, albumType: 'LP', artistName: 'António Variações' },
  { mbid: 'a1b2c3d4-0004-0004-0004-000000000001', title: 'Anjo da Guarda', releaseYear: 1983, albumType: 'LP', artistName: 'António Variações' },
  { mbid: 'a1b2c3d4-0004-0004-0004-000000000002', title: 'O Melhor de António Variações', releaseYear: 1997, albumType: 'Compilation', artistName: 'António Variações' },
  { mbid: 'a1b2c3d4-0004-0004-0004-000000000003', title: 'A História de António Variações – Entre Braga e Nova Iorque', releaseYear: 2006, albumType: 'Compilation', artistName: 'António Variações' },

  // --- Papa Roach ---
  { mbid: '2bb5e8fc-f5b2-4d14-8742-1e9bf478635d', title: 'Infest', releaseYear: 2000, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000001', title: 'Lovehatetragedy', releaseYear: 2002, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000002', title: 'Getting Away with Murder', releaseYear: 2004, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000003', title: 'The Paramour Sessions', releaseYear: 2006, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000004', title: 'Metamorphosis', releaseYear: 2009, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000005', title: 'Time for Annihilation', releaseYear: 2010, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000006', title: 'The Connection', releaseYear: 2012, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000007', title: 'F.E.A.R.', releaseYear: 2015, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000008', title: 'Crooked Teeth', releaseYear: 2017, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000009', title: 'Who Do You Trust?', releaseYear: 2019, albumType: 'LP', artistName: 'Papa Roach' },
  { mbid: 'a1b2c3d4-0005-0005-0005-000000000010', title: 'Ego Trip', releaseYear: 2022, albumType: 'LP', artistName: 'Papa Roach' },

  // --- Quim Barreiros ---
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0101', title: 'Bacalhau à Portuguesa', releaseYear: 1986, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000010', title: 'CD d\'Ouro', releaseYear: 1991, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000011', title: 'Original (O Franguito da Maria)', releaseYear: 1992, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000012', title: 'Deixa Botar Só a Cabeça (Acredita em Mim)', releaseYear: 1993, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000013', title: 'Insónia', releaseYear: 1993, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000014', title: 'Mestre da Culinária', releaseYear: 1994, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000015', title: 'Nunca Gastes Tudo', releaseYear: 1995, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000016', title: 'Minha Vaca Louca', releaseYear: 1996, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000017', title: '15 Grandes Sucessos', releaseYear: 1997, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000018', title: 'Marcha do 3º Milénio', releaseYear: 1999, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000019', title: 'A Garagem da Vizinha', releaseYear: 2000, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000020', title: 'Comer, Comer', releaseYear: 2001, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000021', title: 'Cantares ao Desafio', releaseYear: 2002, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000022', title: 'Na Tua Casa Tá Entrando Outro Macho', releaseYear: 2003, albumType: 'LP', artistName: 'Quim Barreiros' },
  { mbid: 'a1b2c3d4-0006-0006-0006-000000000023', title: 'A Cabritinha', releaseYear: 2004, albumType: 'LP', artistName: 'Quim Barreiros' },

  // --- Amália Rodrigues ---
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0201', title: 'Com Que Voz', releaseYear: 1970, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'a1b2c3d4-0007-0007-0007-000000000010', title: 'Amália no Olympia', releaseYear: 1957, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'a1b2c3d4-0007-0007-0007-000000000011', title: 'Busto', releaseYear: 1962, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'a1b2c3d4-0007-0007-0007-000000000012', title: 'Fado Português', releaseYear: 1965, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'a1b2c3d4-0007-0007-0007-000000000013', title: 'Fados 67', releaseYear: 1967, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'a1b2c3d4-0007-0007-0007-000000000014', title: 'Amália/Vinicius', releaseYear: 1970, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'a1b2c3d4-0007-0007-0007-000000000015', title: 'Cantigas de Amigos', releaseYear: 1971, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'a1b2c3d4-0007-0007-0007-000000000016', title: 'Trova do Vento que Passa', releaseYear: 1974, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'a1b2c3d4-0007-0007-0007-000000000017', title: 'Amália & Don Byas', releaseYear: 1973, albumType: 'LP', artistName: 'Amália Rodrigues' },

  // --- Xutos & Pontapés ---
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0301', title: 'Circo de Feras', releaseYear: 1987, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000010', title: '78/82', releaseYear: 1982, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000011', title: 'Cerco', releaseYear: 1985, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000012', title: '88', releaseYear: 1988, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000013', title: 'Gritos Mudos', releaseYear: 1990, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000014', title: 'Dizer Não de Vez', releaseYear: 1992, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000015', title: 'Direito ao Deserto', releaseYear: 1993, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000016', title: 'Dados Viciados', releaseYear: 1997, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000017', title: 'Xutos & Pontapés', releaseYear: 2009, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000018', title: 'Puro', releaseYear: 2014, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000019', title: 'Duro', releaseYear: 2019, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'a1b2c3d4-0008-0008-0008-000000000020', title: 'Ao Vivo', releaseYear: 1988, albumType: 'LP', artistName: 'Xutos & Pontapés' },

  // --- GNR ---
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0401', title: 'Psicopátria', releaseYear: 1986, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000010', title: 'Independança', releaseYear: 1982, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000011', title: 'Defeitos Especiais', releaseYear: 1984, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000012', title: 'Os Homens Não Se Querem Bonitos', releaseYear: 1985, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000013', title: 'Valsa dos Detectives', releaseYear: 1989, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000014', title: 'Rock in Rio Douro', releaseYear: 1992, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000015', title: 'Sob Escuta', releaseYear: 1994, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000016', title: 'Mosquito', releaseYear: 1998, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000017', title: 'Popless', releaseYear: 2000, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000018', title: 'Do Lado dos Cisnes', releaseYear: 2002, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000019', title: 'Retropolitana', releaseYear: 2010, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'a1b2c3d4-0009-0009-0009-000000000020', title: 'Voos Domésticos', releaseYear: 2011, albumType: 'LP', artistName: 'GNR' },

  // --- Rui Veloso ---
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0501', title: 'Ar de Rock', releaseYear: 1980, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000010', title: 'Fora de Moda', releaseYear: 1982, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000011', title: 'Guardador de Margens', releaseYear: 1983, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000012', title: 'Rui Veloso', releaseYear: 1986, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000013', title: 'Ao Vivo', releaseYear: 1988, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000014', title: 'Mingos & Os Samurais', releaseYear: 1990, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000015', title: 'Auto da Pimenta', releaseYear: 1991, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000016', title: 'Lado Lunar', releaseYear: 1995, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000017', title: 'Avenidas', releaseYear: 1998, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000018', title: 'A Espuma das Canções', releaseYear: 2005, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'a1b2c3d4-0010-0010-0010-000000000019', title: 'Rui Veloso e Amigos', releaseYear: 2012, albumType: 'LP', artistName: 'Rui Veloso' },

  // --- Madredeus ---
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0601', title: 'Os Dias da MadreDeus', releaseYear: 1987, albumType: 'LP', artistName: 'Madredeus' },
  { mbid: 'a1b2c3d4-0011-0011-0011-000000000010', title: 'Existir', releaseYear: 1990, albumType: 'LP', artistName: 'Madredeus' },
  { mbid: 'a1b2c3d4-0011-0011-0011-000000000011', title: 'O Espírito da Paz', releaseYear: 1994, albumType: 'LP', artistName: 'Madredeus' },
  { mbid: 'a1b2c3d4-0011-0011-0011-000000000012', title: 'Ainda', releaseYear: 1995, albumType: 'LP', artistName: 'Madredeus' },
  { mbid: 'a1b2c3d4-0011-0011-0011-000000000013', title: 'O Paraíso', releaseYear: 1997, albumType: 'LP', artistName: 'Madredeus' },
  { mbid: 'a1b2c3d4-0011-0011-0011-000000000014', title: 'Movimento', releaseYear: 2001, albumType: 'LP', artistName: 'Madredeus' },
  { mbid: 'a1b2c3d4-0011-0011-0011-000000000015', title: 'Um Amor Infinito', releaseYear: 2004, albumType: 'LP', artistName: 'Madredeus' },
  { mbid: 'a1b2c3d4-0011-0011-0011-000000000016', title: 'Faluas do Tejo', releaseYear: 2005, albumType: 'LP', artistName: 'Madredeus' }
];

// Versões de álbuns (EAN-13, suporte físico, designação opcional)
// Mapeadas pelo MBID do álbum
const VERSIONS_BY_MBID = {
  // Radiohead - OK Computer
  'ddacdf34-2e2d-4d7a-af37-56e632d4b998': [
    { ean13: '0724385522925', physicalSupport: 'CD', designation: null },
    { ean13: '0634904078119', physicalSupport: 'vinil', designation: null },
    { ean13: '0634904078218', physicalSupport: 'vinil', designation: 'OKNOTOK Edition' },
    { ean13: '0634904078317', physicalSupport: 'cassete', designation: null }
  ],
  // Radiohead - Kid A
  'c2eaf764-ca57-4180-b2f5-b6d8f1e5fb06': [
    { ean13: '0724352957026', physicalSupport: 'CD', designation: null },
    { ean13: '0634904079017', physicalSupport: 'vinil', designation: null }
  ],
  // Radiohead - In Rainbows
  'a1b2c3d4-0001-0001-0001-000000000005': [
    { ean13: '0634904032128', physicalSupport: 'CD', designation: null },
    { ean13: '0634904032227', physicalSupport: 'vinil', designation: null },
    { ean13: '0634904032326', physicalSupport: 'CD', designation: 'Deluxe Edition' }
  ],
  // The Beatles - Abbey Road
  'a1b2c3d4-0002-0002-0002-000000000011': [
    { ean13: '0094638246923', physicalSupport: 'CD', designation: null },
    { ean13: '0094638246824', physicalSupport: 'vinil', designation: null },
    { ean13: '0094638246725', physicalSupport: 'vinil', designation: '50th Anniversary Edition' },
    { ean13: '0094638246626', physicalSupport: 'cassete', designation: null }
  ],
  // The Beatles - Let It Be
  '64e32095-d24b-4ec5-bc16-6701509930f9': [
    { ean13: '0602435922423', physicalSupport: 'CD', designation: null },
    { ean13: '0602435922324', physicalSupport: 'vinil', designation: null }
  ],
  // The Beatles - Sgt. Pepper's
  'a1b2c3d4-0002-0002-0002-000000000007': [
    { ean13: '0602557455328', physicalSupport: 'CD', designation: null },
    { ean13: '0602557455229', physicalSupport: 'vinil', designation: null },
    { ean13: '0602557455120', physicalSupport: 'CD', designation: 'Deluxe Anniversary' }
  ],
  // Ornatos Violeta - Cão!
  'a1b2c3d4-e5f6-7890-1234-56789abcdef1': [
    { ean13: '5099749531628', physicalSupport: 'CD', designation: null },
    { ean13: '5099749531529', physicalSupport: 'vinil', designation: 'Reedição 2022' }
  ],
  // Ornatos Violeta - O Monstro Precisa de Amigos
  'a1b2c3d4-0003-0003-0003-000000000001': [
    { ean13: '5099749531321', physicalSupport: 'CD', designation: null },
    { ean13: '5099749531222', physicalSupport: 'vinil', designation: null }
  ],
  // António Variações - Anjo da Guarda
  'a1b2c3d4-0004-0004-0004-000000000001': [
    { ean13: '5099901098525', physicalSupport: 'CD', designation: null },
    { ean13: '5099901098426', physicalSupport: 'vinil', designation: null },
    { ean13: '5099901098327', physicalSupport: 'cassete', designation: null }
  ],
  // Papa Roach - Infest
  '2bb5e8fc-f5b2-4d14-8742-1e9bf478635d': [
    { ean13: '0600445032125', physicalSupport: 'CD', designation: null },
    { ean13: '0600445032026', physicalSupport: 'vinil', designation: null },
    { ean13: '0600445032224', physicalSupport: 'CD', designation: '20th Anniversary Edition' }
  ],
  // Quim Barreiros - Bacalhau à Portuguesa
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0101': [
    { ean13: '5601010100128', physicalSupport: 'CD', designation: null },
    { ean13: '5601010100029', physicalSupport: 'vinil', designation: null }
  ],
  // Amália Rodrigues - Com Que Voz
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0201': [
    { ean13: '5601020200126', physicalSupport: 'CD', designation: null },
    { ean13: '5601020200027', physicalSupport: 'vinil', designation: null },
    { ean13: '5601020200225', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Xutos & Pontapés - Circo de Feras
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0301': [
    { ean13: '5601030300124', physicalSupport: 'CD', designation: null },
    { ean13: '5601030300025', physicalSupport: 'vinil', designation: null }
  ],
  // GNR - Psicopátria
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0401': [
    { ean13: '5601040400122', physicalSupport: 'CD', designation: null },
    { ean13: '5601040400023', physicalSupport: 'vinil', designation: null }
  ],
  // Rui Veloso - Ar de Rock
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0501': [
    { ean13: '5601050500120', physicalSupport: 'CD', designation: null },
    { ean13: '5601050500021', physicalSupport: 'vinil', designation: null },
    { ean13: '5601050500319', physicalSupport: 'cassete', designation: null }
  ],
  // Madredeus - Os Dias da MadreDeus
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0601': [
    { ean13: '5601060600128', physicalSupport: 'CD', designation: null },
    { ean13: '5601060600029', physicalSupport: 'vinil', designation: null }
  ],
  // Radiohead - Pablo Honey
  'a1b2c3d4-0001-0001-0001-000000000001': [
    { ean13: '0724382189428', physicalSupport: 'CD', designation: null }
  ],
  // Radiohead - The Bends
  'a1b2c3d4-0001-0001-0001-000000000002': [
    { ean13: '0724383547227', physicalSupport: 'CD', designation: null },
    { ean13: '0724383547128', physicalSupport: 'vinil', designation: null }
  ],
  // Radiohead - A Moon Shaped Pool
  'a1b2c3d4-0001-0001-0001-000000000007': [
    { ean13: '0634904079215', physicalSupport: 'CD', designation: null },
    { ean13: '0634904079314', physicalSupport: 'vinil', designation: 'White Vinyl' }
  ]
};

async function buildTestAlbums() {
  const artistNames = [...new Set(TEST_ALBUMS.filter((album) => album.artistName).map((album) => album.artistName))];
  const artists = await Artist.find({ name: { $in: artistNames } }).select('_id name').lean();
  const artistIdByName = new Map(artists.map((artist) => [artist.name, artist._id]));

  return TEST_ALBUMS.map((album) => {
    const { artistName, ...albumData } = album;
    return {
      ...albumData,
      artista: artistName ? artistIdByName.get(artistName) || null : null
    };
  });
}

// Atualizar álbuns existentes com versões (caso ainda não tenham)
async function seedVersions() {
  let updatedCount = 0;
  const mbids = Object.keys(VERSIONS_BY_MBID);

  for (const mbid of mbids) {
    const album = await Album.findOne({ mbid });
    if (album && (!album.versions || album.versions.length === 0)) {
      album.versions = VERSIONS_BY_MBID[mbid];
      await album.save();
      updatedCount++;
    }
  }

  return updatedCount;
}

async function seedTestData() {
  const artistsCountBefore = await Artist.countDocuments();
  const albumsCountBefore = await Album.countDocuments();

  let insertedArtists = 0;
  let insertedAlbums = 0;

  const seedIsnis = TEST_ARTISTS.map((artist) => artist.isni);
  const existingSeedArtists = await Artist.find({ isni: { $in: seedIsnis } }).select('isni').lean();
  const existingSeedIsnis = new Set(existingSeedArtists.map((artist) => artist.isni));
  const artistsToInsert = TEST_ARTISTS.filter((artist) => !existingSeedIsnis.has(artist.isni));

  if (artistsToInsert.length > 0) {
    await Artist.insertMany(artistsToInsert);
    insertedArtists = artistsToInsert.length;
  }

  const testAlbums = await buildTestAlbums();
  // Adicionar versões aos álbuns novos antes de inserir
  const testAlbumsWithVersions = testAlbums.map((album) => ({
    ...album,
    versions: VERSIONS_BY_MBID[album.mbid] || []
  }));

  const seedMbids = testAlbumsWithVersions.map((album) => album.mbid);
  const existingSeedAlbums = await Album.find({ mbid: { $in: seedMbids } }).select('mbid').lean();
  const existingSeedMbids = new Set(existingSeedAlbums.map((album) => album.mbid));
  const albumsToInsert = testAlbumsWithVersions.filter((album) => !existingSeedMbids.has(album.mbid));

  if (albumsToInsert.length > 0) {
    await Album.insertMany(albumsToInsert);
    insertedAlbums = albumsToInsert.length;
  }

  // Atualizar álbuns existentes que ainda não têm versões
  const updatedVersions = await seedVersions();

  return {
    artistsCountBefore,
    albumsCountBefore,
    insertedArtists,
    insertedAlbums,
    updatedVersions,
    alreadySeeded: insertedArtists === 0 && insertedAlbums === 0 && updatedVersions === 0
  };
}

module.exports = { seedTestData };
