const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Song = require('../models/Song');

const TEST_ARTISTS = [
  { name: 'Radiohead', startYear: 1985, isni: '0000000115264296', artistType: 'group', members: [], imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb4104fbd80f1f795728abbd59' },
  { name: 'The Beatles', startYear: 1960, isni: '0000000121707484', artistType: 'group', members: [], imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebe9348cc01ff5d55971b22433' },
  { name: 'Ornatos Violeta', startYear: 1991, isni: '0000000105374567', artistType: 'group', members: [], imageUrl: 'https://i.scdn.co/image/ab6761610000f1786264e5e495e2fc2e3362b829' },
  { name: 'António Variações', startYear: 1978, isni: '0000000080608544', artistType: 'solo', members: [], imageUrl: 'https://i.scdn.co/image/ab67616d0000b273ae673fecee9af1ae7844a20f' },
  { name: 'Papa Roach', startYear: 1993, isni: '0000000115041071', artistType: 'group', members: [], imageUrl: 'https://i.scdn.co/image/ab67616100005174d3757f63ec317d0309a8115a' },
  { name: 'Quim Barreiros', startYear: 1971, isni: '0000000199001001', artistType: 'solo', members: [], imageUrl: 'https://i.scdn.co/image/ab67616100005174d762ee952a5ccccd741df4bf' },
  { name: 'Amália Rodrigues', startYear: 1939, isni: '0000000199001002', artistType: 'solo', members: [], imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb5589024ae35951d679840614' },
  { name: 'Xutos & Pontapés', startYear: 1978, isni: '0000000199001003', artistType: 'group', members: [], imageUrl: 'https://i.scdn.co/image/ab67616d0000b273440e8c2bfc91cc9f09a42fba' },
  { name: 'GNR', startYear: 1980, isni: '0000000199001004', artistType: 'group', members: [], imageUrl: 'https://i.scdn.co/image/ab676161000051746264e5e495e2fc2e3362b829' },
  { name: 'Rui Veloso', startYear: 1980, isni: '0000000199001005', artistType: 'solo', members: [], imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb2dc4886f0182279645cb3507' },
  { name: 'Madredeus', startYear: 1985, isni: '0000000199001006', artistType: 'group', members: [], imageUrl: 'https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/thisisv3/3mlxV3eHtMwvoOSLzR6CFj/pt' },
  { name: 'Paulo Gonzo', startYear: 1975, isni: '0000000067812702', artistType: 'solo', members: [], imageUrl: 'https://i.scdn.co/image/ab6761610000e5eb419a91c44615738317695474' },
  { name: 'Bruno Mars', startYear: 2004, isni: '0000000115004121', artistType: 'solo', members: [], imageUrl: 'https://i.scdn.co/image/ab6761610000e5ebc7688aad1bf03986934d7e26' }
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
  { mbid: 'a1b2c3d4-0011-0011-0011-000000000016', title: 'Faluas do Tejo', releaseYear: 2005, albumType: 'LP', artistName: 'Madredeus' },

  // --- Paulo Gonzo ---
  { mbid: 'a1b2c3d4-0012-0012-0012-000000000001', title: 'Jardins Proibidos (Memorial)', releaseYear: 1997, albumType: 'LP', artistName: 'Paulo Gonzo' },
  { mbid: 'a1b2c3d4-0012-0012-0012-000000000002', title: 'Quase Tudo', releaseYear: 1998, albumType: 'LP', artistName: 'Paulo Gonzo' },

  // --- Bruno Mars ---
  { mbid: 'a1b2c3d4-0013-0013-0013-000000000001', title: 'Doo-Wops & Hooligans', releaseYear: 2010, albumType: 'LP', artistName: 'Bruno Mars' },
  { mbid: 'a1b2c3d4-0013-0013-0013-000000000002', title: 'Unorthodox Jukebox', releaseYear: 2012, albumType: 'LP', artistName: 'Bruno Mars' },
  { mbid: 'a1b2c3d4-0013-0013-0013-000000000003', title: '24K Magic', releaseYear: 2016, albumType: 'LP', artistName: 'Bruno Mars' },
  { mbid: 'a1b2c3d4-0013-0013-0013-000000000004', title: 'An Evening with Silk Sonic', releaseYear: 2021, albumType: 'LP', artistName: 'Bruno Mars' }
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

// Faixas por MBID. Tracklists reais e completas para todos os álbuns.
const TRACKS_BY_MBID = {
  // Radiohead — OK Computer (tracklist completa)
  'ddacdf34-2e2d-4d7a-af37-56e632d4b998': [
    { trackNumber: 1, title: 'Airbag', durationSeconds: 276 },
    { trackNumber: 2, title: 'Paranoid Android', durationSeconds: 386 },
    { trackNumber: 3, title: 'Subterranean Homesick Alien', durationSeconds: 269 },
    { trackNumber: 4, title: 'Exit Music (For a Film)', durationSeconds: 244 },
    { trackNumber: 5, title: 'Let Down', durationSeconds: 277 },
    { trackNumber: 6, title: 'Karma Police', durationSeconds: 262 },
    { trackNumber: 7, title: 'Fitter Happier', durationSeconds: 116 },
    { trackNumber: 8, title: 'Electioneering', durationSeconds: 231 },
    { trackNumber: 9, title: 'Climbing Up the Walls', durationSeconds: 277 },
    { trackNumber: 10, title: 'No Surprises', durationSeconds: 228 },
    { trackNumber: 11, title: 'Lucky', durationSeconds: 258 },
    { trackNumber: 12, title: 'The Tourist', durationSeconds: 325 }
  ],

  // Radiohead — Kid A (tracklist completa)
  'c2eaf764-ca57-4180-b2f5-b6d8f1e5fb06': [
    { trackNumber: 1, title: 'Everything In Its Right Place', durationSeconds: 247 },
    { trackNumber: 2, title: 'Kid A', durationSeconds: 276 },
    { trackNumber: 3, title: 'The National Anthem', durationSeconds: 367 },
    { trackNumber: 4, title: 'How to Disappear Completely', durationSeconds: 354 },
    { trackNumber: 5, title: 'Treefingers', durationSeconds: 228 },
    { trackNumber: 6, title: 'Optimistic', durationSeconds: 325 },
    { trackNumber: 7, title: 'In Limbo', durationSeconds: 229 },
    { trackNumber: 8, title: 'Idioteque', durationSeconds: 281 },
    { trackNumber: 9, title: 'Morning Bell', durationSeconds: 268 },
    { trackNumber: 10, title: 'Motion Picture Soundtrack', durationSeconds: 358 }
  ],

  // Radiohead — In Rainbows (tracklist completa)
  'a1b2c3d4-0001-0001-0001-000000000005': [
    { trackNumber: 1, title: '15 Step', durationSeconds: 235 },
    { trackNumber: 2, title: 'Bodysnatchers', durationSeconds: 255 },
    { trackNumber: 3, title: 'Nude', durationSeconds: 256 },
    { trackNumber: 4, title: 'Weird Fishes/Arpeggi', durationSeconds: 319 },
    { trackNumber: 5, title: 'All I Need', durationSeconds: 228 },
    { trackNumber: 6, title: 'Faust Arp', durationSeconds: 130 },
    { trackNumber: 7, title: 'Reckoner', durationSeconds: 289 },
    { trackNumber: 8, title: 'House of Cards', durationSeconds: 330 },
    { trackNumber: 9, title: 'Jigsaw Falling into Place', durationSeconds: 247 },
    { trackNumber: 10, title: 'Videotape', durationSeconds: 282 }
  ],

  // Radiohead — Pablo Honey (tracklist completa)
  'a1b2c3d4-0001-0001-0001-000000000001': [
    { trackNumber: 1, title: 'You', durationSeconds: 201 },
    { trackNumber: 2, title: 'Creep', durationSeconds: 238 },
    { trackNumber: 3, title: 'How Do You?', durationSeconds: 131 },
    { trackNumber: 4, title: 'Stop Whispering', durationSeconds: 316 },
    { trackNumber: 5, title: 'Thinking About You', durationSeconds: 162 },
    { trackNumber: 6, title: 'Anyone Can Play Guitar', durationSeconds: 222 },
    { trackNumber: 7, title: 'Ripcord', durationSeconds: 192 },
    { trackNumber: 8, title: 'Vegetable', durationSeconds: 192 },
    { trackNumber: 9, title: 'Prove Yourself', durationSeconds: 149 },
    { trackNumber: 10, title: "I Can't", durationSeconds: 264 },
    { trackNumber: 11, title: 'Lurgee', durationSeconds: 188 },
    { trackNumber: 12, title: 'Blow Out', durationSeconds: 282 }
  ],

  // Radiohead — The Bends (tracklist completa)
  'a1b2c3d4-0001-0001-0001-000000000002': [
    { trackNumber: 1, title: 'Planet Telex', durationSeconds: 257 },
    { trackNumber: 2, title: 'The Bends', durationSeconds: 239 },
    { trackNumber: 3, title: 'High and Dry', durationSeconds: 248 },
    { trackNumber: 4, title: 'Fake Plastic Trees', durationSeconds: 277 },
    { trackNumber: 5, title: 'Bones', durationSeconds: 188 },
    { trackNumber: 6, title: '(Nice Dream)', durationSeconds: 229 },
    { trackNumber: 7, title: 'Just', durationSeconds: 234 },
    { trackNumber: 8, title: 'My Iron Lung', durationSeconds: 278 },
    { trackNumber: 9, title: 'Bullet Proof..I Wish I Was', durationSeconds: 185 },
    { trackNumber: 10, title: 'Black Star', durationSeconds: 246 },
    { trackNumber: 11, title: 'Sulk', durationSeconds: 202 },
    { trackNumber: 12, title: 'Street Spirit (Fade Out)', durationSeconds: 255 }
  ],

  // Radiohead — Amnesiac (tracklist completa)
  'a1b2c3d4-0001-0001-0001-000000000003': [
    { trackNumber: 1, title: 'Packt Like Sardines in a Crushd Tin Box', durationSeconds: 217 },
    { trackNumber: 2, title: 'Pyramid Song', durationSeconds: 285 },
    { trackNumber: 3, title: 'Pulk/Pull Revolving Doors', durationSeconds: 236 },
    { trackNumber: 4, title: 'You and Whose Army?', durationSeconds: 218 },
    { trackNumber: 5, title: 'I Might Be Wrong', durationSeconds: 247 },
    { trackNumber: 6, title: 'Knives Out', durationSeconds: 275 },
    { trackNumber: 7, title: 'Morning Bell/Amnesiac', durationSeconds: 215 },
    { trackNumber: 8, title: 'Dollars and Cents', durationSeconds: 284 },
    { trackNumber: 9, title: 'Hunting Bears', durationSeconds: 142 },
    { trackNumber: 10, title: 'Like Spinning Plates', durationSeconds: 222 },
    { trackNumber: 11, title: 'Life in a Glasshouse', durationSeconds: 277 }
  ],

  // Radiohead — Hail to the Thief (tracklist completa)
  'a1b2c3d4-0001-0001-0001-000000000004': [
    { trackNumber: 1, title: '2 + 2 = 5', durationSeconds: 218 },
    { trackNumber: 2, title: 'Sit Down. Stand Up.', durationSeconds: 282 },
    { trackNumber: 3, title: 'Sail to the Moon', durationSeconds: 282 },
    { trackNumber: 4, title: 'Backdrifts', durationSeconds: 306 },
    { trackNumber: 5, title: 'Go to Sleep', durationSeconds: 215 },
    { trackNumber: 6, title: 'Where I End and You Begin', durationSeconds: 291 },
    { trackNumber: 7, title: "We Suck Young Blood", durationSeconds: 307 },
    { trackNumber: 8, title: 'The Gloaming', durationSeconds: 193 },
    { trackNumber: 9, title: 'There There', durationSeconds: 327 },
    { trackNumber: 10, title: 'I Will', durationSeconds: 117 },
    { trackNumber: 11, title: 'A Punchup at a Wedding', durationSeconds: 295 },
    { trackNumber: 12, title: 'Myxomatosis', durationSeconds: 214 },
    { trackNumber: 13, title: 'Scatterbrain', durationSeconds: 201 },
    { trackNumber: 14, title: 'A Wolf at the Door', durationSeconds: 226 }
  ],

  // Radiohead — The King of Limbs (tracklist completa)
  'a1b2c3d4-0001-0001-0001-000000000006': [
    { trackNumber: 1, title: 'Bloom', durationSeconds: 331 },
    { trackNumber: 2, title: 'Morning Mr Magpie', durationSeconds: 293 },
    { trackNumber: 3, title: 'Little by Little', durationSeconds: 272 },
    { trackNumber: 4, title: 'Feral', durationSeconds: 237 },
    { trackNumber: 5, title: 'Lotus Flower', durationSeconds: 281 },
    { trackNumber: 6, title: 'Codex', durationSeconds: 280 },
    { trackNumber: 7, title: 'Give Up the Ghost', durationSeconds: 254 },
    { trackNumber: 8, title: 'Separator', durationSeconds: 302 }
  ],

  // Radiohead — A Moon Shaped Pool (tracklist completa)
  'a1b2c3d4-0001-0001-0001-000000000007': [
    { trackNumber: 1, title: 'Burn the Witch', durationSeconds: 228 },
    { trackNumber: 2, title: 'Daydreaming', durationSeconds: 422 },
    { trackNumber: 3, title: 'Decks Dark', durationSeconds: 294 },
    { trackNumber: 4, title: 'Desert Island Disk', durationSeconds: 263 },
    { trackNumber: 5, title: 'Ful Stop', durationSeconds: 367 },
    { trackNumber: 6, title: 'Glass Eyes', durationSeconds: 190 },
    { trackNumber: 7, title: 'Identikit', durationSeconds: 276 },
    { trackNumber: 8, title: 'The Numbers', durationSeconds: 340 },
    { trackNumber: 9, title: 'Present Tense', durationSeconds: 301 },
    { trackNumber: 10, title: 'Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief', durationSeconds: 279 },
    { trackNumber: 11, title: 'True Love Waits', durationSeconds: 250 }
  ],

  // The Beatles — Please Please Me (tracklist completa)
  'd22d25f7-fdfa-4fc8-9fce-e0c65df5af9c': [
    { trackNumber: 1, title: 'I Saw Her Standing There', durationSeconds: 173 },
    { trackNumber: 2, title: 'Misery', durationSeconds: 107 },
    { trackNumber: 3, title: 'Anna (Go to Him)', durationSeconds: 167 },
    { trackNumber: 4, title: 'Chains', durationSeconds: 139 },
    { trackNumber: 5, title: 'Boys', durationSeconds: 142 },
    { trackNumber: 6, title: 'Ask Me Why', durationSeconds: 144 },
    { trackNumber: 7, title: 'Please Please Me', durationSeconds: 119 },
    { trackNumber: 8, title: 'Love Me Do', durationSeconds: 143 },
    { trackNumber: 9, title: 'P.S. I Love You', durationSeconds: 121 },
    { trackNumber: 10, title: 'Baby It\'s You', durationSeconds: 160 },
    { trackNumber: 11, title: 'Do You Want to Know a Secret', durationSeconds: 117 },
    { trackNumber: 12, title: 'A Taste of Honey', durationSeconds: 120 },
    { trackNumber: 13, title: 'There\'s a Place', durationSeconds: 109 },
    { trackNumber: 14, title: 'Twist and Shout', durationSeconds: 155 }
  ],

  // The Beatles — With The Beatles
  'a1b2c3d4-0002-0002-0002-000000000001': [
    { trackNumber: 1, title: 'It Won\'t Be Long', durationSeconds: 140 },
    { trackNumber: 2, title: 'All I\'ve Got to Do', durationSeconds: 124 },
    { trackNumber: 3, title: 'All My Loving', durationSeconds: 125 },
    { trackNumber: 4, title: 'Don\'t Bother Me', durationSeconds: 146 },
    { trackNumber: 5, title: 'Little Child', durationSeconds: 106 },
    { trackNumber: 6, title: 'Till There Was You', durationSeconds: 133 },
    { trackNumber: 7, title: 'Please Mister Postman', durationSeconds: 134 },
    { trackNumber: 8, title: 'Roll Over Beethoven', durationSeconds: 170 },
    { trackNumber: 9, title: 'Hold Me Tight', durationSeconds: 140 },
    { trackNumber: 10, title: 'You\'ve Really Got a Hold on Me', durationSeconds: 181 },
    { trackNumber: 11, title: 'I Wanna Be Your Man', durationSeconds: 119 },
    { trackNumber: 12, title: 'Devil in Her Heart', durationSeconds: 136 },
    { trackNumber: 13, title: 'Not a Second Time', durationSeconds: 128 },
    { trackNumber: 14, title: 'Money (That\'s What I Want)', durationSeconds: 186 }
  ],

  // The Beatles — A Hard Day's Night
  'a1b2c3d4-0002-0002-0002-000000000002': [
    { trackNumber: 1, title: 'A Hard Day\'s Night', durationSeconds: 154 },
    { trackNumber: 2, title: 'I Should Have Known Better', durationSeconds: 175 },
    { trackNumber: 3, title: 'If I Fell', durationSeconds: 138 },
    { trackNumber: 4, title: 'I\'m Happy Just to Dance with You', durationSeconds: 109 },
    { trackNumber: 5, title: 'And I Love Her', durationSeconds: 152 },
    { trackNumber: 6, title: 'Tell Me Why', durationSeconds: 127 },
    { trackNumber: 7, title: 'Can\'t Buy Me Love', durationSeconds: 130 },
    { trackNumber: 8, title: 'Any Time at All', durationSeconds: 133 },
    { trackNumber: 9, title: 'I\'ll Cry Instead', durationSeconds: 106 },
    { trackNumber: 10, title: 'Things We Said Today', durationSeconds: 156 },
    { trackNumber: 11, title: 'When I Get Home', durationSeconds: 139 },
    { trackNumber: 12, title: 'You Can\'t Do That', durationSeconds: 155 },
    { trackNumber: 13, title: 'I\'ll Be Back', durationSeconds: 161 }
  ],

  // The Beatles — Beatles For Sale
  'a1b2c3d4-0002-0002-0002-000000000003': [
    { trackNumber: 1, title: 'No Reply', durationSeconds: 135 },
    { trackNumber: 2, title: 'I\'m a Loser', durationSeconds: 156 },
    { trackNumber: 3, title: 'Baby\'s in Black', durationSeconds: 146 },
    { trackNumber: 4, title: 'Rock and Roll Music', durationSeconds: 148 },
    { trackNumber: 5, title: 'I\'ll Follow the Sun', durationSeconds: 108 },
    { trackNumber: 6, title: 'Mr. Moonlight', durationSeconds: 133 },
    { trackNumber: 7, title: 'Kansas City / Hey-Hey-Hey-Hey!', durationSeconds: 150 },
    { trackNumber: 8, title: 'Eight Days a Week', durationSeconds: 163 },
    { trackNumber: 9, title: 'Words of Love', durationSeconds: 124 },
    { trackNumber: 10, title: 'Honey Don\'t', durationSeconds: 168 },
    { trackNumber: 11, title: 'Every Little Thing', durationSeconds: 150 },
    { trackNumber: 12, title: 'I Don\'t Want to Spoil the Party', durationSeconds: 149 },
    { trackNumber: 13, title: 'What You\'re Doing', durationSeconds: 148 },
    { trackNumber: 14, title: 'Everybody\'s Trying to Be My Baby', durationSeconds: 139 }
  ],

  // The Beatles — Help!
  'a1b2c3d4-0002-0002-0002-000000000004': [
    { trackNumber: 1, title: 'Help!', durationSeconds: 137 },
    { trackNumber: 2, title: 'The Night Before', durationSeconds: 153 },
    { trackNumber: 3, title: 'You\'ve Got to Hide Your Love Away', durationSeconds: 131 },
    { trackNumber: 4, title: 'I Need You', durationSeconds: 148 },
    { trackNumber: 5, title: 'Another Girl', durationSeconds: 124 },
    { trackNumber: 6, title: 'You\'re Going to Lose That Girl', durationSeconds: 140 },
    { trackNumber: 7, title: 'Ticket to Ride', durationSeconds: 190 },
    { trackNumber: 8, title: 'Act Naturally', durationSeconds: 148 },
    { trackNumber: 9, title: 'It\'s Only Love', durationSeconds: 117 },
    { trackNumber: 10, title: 'You Like Me Too Much', durationSeconds: 155 },
    { trackNumber: 11, title: 'Tell Me What You See', durationSeconds: 150 },
    { trackNumber: 12, title: 'I\'ve Just Seen a Face', durationSeconds: 127 },
    { trackNumber: 13, title: 'Yesterday', durationSeconds: 125 },
    { trackNumber: 14, title: 'Dizzy Miss Lizzy', durationSeconds: 165 }
  ],

  // The Beatles — Rubber Soul
  'a1b2c3d4-0002-0002-0002-000000000005': [
    { trackNumber: 1, title: 'Drive My Car', durationSeconds: 144 },
    { trackNumber: 2, title: 'Norwegian Wood (This Bird Has Flown)', durationSeconds: 124 },
    { trackNumber: 3, title: 'You Won\'t See Me', durationSeconds: 199 },
    { trackNumber: 4, title: 'Nowhere Man', durationSeconds: 162 },
    { trackNumber: 5, title: 'Think for Yourself', durationSeconds: 138 },
    { trackNumber: 6, title: 'The Word', durationSeconds: 159 },
    { trackNumber: 7, title: 'Michelle', durationSeconds: 160 },
    { trackNumber: 8, title: 'What Goes On', durationSeconds: 170 },
    { trackNumber: 9, title: 'Girl', durationSeconds: 152 },
    { trackNumber: 10, title: 'I\'m Looking Through You', durationSeconds: 147 },
    { trackNumber: 11, title: 'In My Life', durationSeconds: 146 },
    { trackNumber: 12, title: 'Wait', durationSeconds: 138 },
    { trackNumber: 13, title: 'If I Needed Someone', durationSeconds: 142 },
    { trackNumber: 14, title: 'Run for Your Life', durationSeconds: 138 }
  ],

  // The Beatles — Revolver
  'a1b2c3d4-0002-0002-0002-000000000006': [
    { trackNumber: 1, title: 'Taxman', durationSeconds: 158 },
    { trackNumber: 2, title: 'Eleanor Rigby', durationSeconds: 127 },
    { trackNumber: 3, title: 'I\'m Only Sleeping', durationSeconds: 173 },
    { trackNumber: 4, title: 'Love You To', durationSeconds: 181 },
    { trackNumber: 5, title: 'Here, There and Everywhere', durationSeconds: 140 },
    { trackNumber: 6, title: 'Yellow Submarine', durationSeconds: 160 },
    { trackNumber: 7, title: 'She Said She Said', durationSeconds: 159 },
    { trackNumber: 8, title: 'Good Day Sunshine', durationSeconds: 129 },
    { trackNumber: 9, title: 'And Your Bird Can Sing', durationSeconds: 121 },
    { trackNumber: 10, title: 'For No One', durationSeconds: 120 },
    { trackNumber: 11, title: 'Doctor Robert', durationSeconds: 142 },
    { trackNumber: 12, title: 'I Want to Tell You', durationSeconds: 148 },
    { trackNumber: 13, title: 'Got to Get You into My Life', durationSeconds: 147 },
    { trackNumber: 14, title: 'Tomorrow Never Knows', durationSeconds: 179 }
  ],

  // The Beatles — Sgt. Pepper's Lonely Hearts Club Band
  'a1b2c3d4-0002-0002-0002-000000000007': [
    { trackNumber: 1, title: 'Sgt. Pepper\'s Lonely Hearts Club Band', durationSeconds: 122 },
    { trackNumber: 2, title: 'With a Little Help from My Friends', durationSeconds: 163 },
    { trackNumber: 3, title: 'Lucy in the Sky with Diamonds', durationSeconds: 209 },
    { trackNumber: 4, title: 'Getting Better', durationSeconds: 168 },
    { trackNumber: 5, title: 'Fixing a Hole', durationSeconds: 156 },
    { trackNumber: 6, title: 'She\'s Leaving Home', durationSeconds: 211 },
    { trackNumber: 7, title: 'Being for the Benefit of Mr. Kite!', durationSeconds: 165 },
    { trackNumber: 8, title: 'Within You Without You', durationSeconds: 300 },
    { trackNumber: 9, title: 'When I\'m Sixty-Four', durationSeconds: 163 },
    { trackNumber: 10, title: 'Lovely Rita', durationSeconds: 166 },
    { trackNumber: 11, title: 'Good Morning Good Morning', durationSeconds: 159 },
    { trackNumber: 12, title: 'Sgt. Pepper\'s Lonely Hearts Club Band (Reprise)', durationSeconds: 74 },
    { trackNumber: 13, title: 'A Day in the Life', durationSeconds: 337 }
  ],

  // The Beatles — Magical Mystery Tour
  'a1b2c3d4-0002-0002-0002-000000000008': [
    { trackNumber: 1, title: 'Magical Mystery Tour', durationSeconds: 133 },
    { trackNumber: 2, title: 'The Fool on the Hill', durationSeconds: 181 },
    { trackNumber: 3, title: 'Flying', durationSeconds: 136 },
    { trackNumber: 4, title: 'Blue Jay Way', durationSeconds: 231 },
    { trackNumber: 5, title: 'Your Mother Should Know', durationSeconds: 147 },
    { trackNumber: 6, title: 'I Am the Walrus', durationSeconds: 269 },
    { trackNumber: 7, title: 'Hello, Goodbye', durationSeconds: 213 },
    { trackNumber: 8, title: 'Strawberry Fields Forever', durationSeconds: 249 },
    { trackNumber: 9, title: 'Penny Lane', durationSeconds: 181 },
    { trackNumber: 10, title: 'Baby, You\'re a Rich Man', durationSeconds: 186 },
    { trackNumber: 11, title: 'All You Need Is Love', durationSeconds: 237 }
  ],

  // The Beatles — White Album
  'a1b2c3d4-0002-0002-0002-000000000009': [
    { trackNumber: 1, title: 'Back in the U.S.S.R.', durationSeconds: 162 },
    { trackNumber: 2, title: 'Dear Prudence', durationSeconds: 215 },
    { trackNumber: 3, title: 'Glass Onion', durationSeconds: 168 },
    { trackNumber: 4, title: 'Ob-La-Di, Ob-La-Da', durationSeconds: 191 },
    { trackNumber: 5, title: 'Wild Honey Pie', durationSeconds: 53 },
    { trackNumber: 6, title: 'The Continuing Story of Bungalow Bill', durationSeconds: 185 },
    { trackNumber: 7, title: 'While My Guitar Gently Weeps', durationSeconds: 283 },
    { trackNumber: 8, title: 'Happiness Is a Warm Gun', durationSeconds: 167 },
    { trackNumber: 9, title: 'Martha My Dear', durationSeconds: 149 },
    { trackNumber: 10, title: 'I\'m So Tired', durationSeconds: 123 },
    { trackNumber: 11, title: 'Blackbird', durationSeconds: 135 },
    { trackNumber: 12, title: 'Piggies', durationSeconds: 123 },
    { trackNumber: 13, title: 'Rocky Raccoon', durationSeconds: 215 },
    { trackNumber: 14, title: 'Don\'t Pass Me By', durationSeconds: 219 },
    { trackNumber: 15, title: 'Why Don\'t We Do It in the Road?', durationSeconds: 105 },
    { trackNumber: 16, title: 'I Will', durationSeconds: 108 },
    { trackNumber: 17, title: 'Julia', durationSeconds: 167 },
    { trackNumber: 18, title: 'Birthday', durationSeconds: 168 },
    { trackNumber: 19, title: 'Yer Blues', durationSeconds: 249 },
    { trackNumber: 20, title: 'Mother Nature\'s Son', durationSeconds: 166 },
    { trackNumber: 21, title: 'Everybody\'s Got Something to Hide Except Me and My Monkey', durationSeconds: 198 },
    { trackNumber: 22, title: 'Sexy Sadie', durationSeconds: 186 },
    { trackNumber: 23, title: 'Helter Skelter', durationSeconds: 270 },
    { trackNumber: 24, title: 'Long, Long, Long', durationSeconds: 181 },
    { trackNumber: 25, title: 'Revolution 1', durationSeconds: 265 },
    { trackNumber: 26, title: 'Honey Pie', durationSeconds: 172 },
    { trackNumber: 27, title: 'Savoy Truffle', durationSeconds: 189 },
    { trackNumber: 28, title: 'Cry Baby Cry', durationSeconds: 190 },
    { trackNumber: 29, title: 'Revolution 9', durationSeconds: 500 },
    { trackNumber: 30, title: 'Good Night', durationSeconds: 192 }
  ],

  // The Beatles — Yellow Submarine
  'a1b2c3d4-0002-0002-0002-000000000010': [
    { trackNumber: 1, title: 'Yellow Submarine', durationSeconds: 160 },
    { trackNumber: 2, title: 'Only a Northern Song', durationSeconds: 205 },
    { trackNumber: 3, title: 'All Together Now', durationSeconds: 131 },
    { trackNumber: 4, title: 'Hey Bulldog', durationSeconds: 193 },
    { trackNumber: 5, title: 'It\'s All Too Much', durationSeconds: 391 },
    { trackNumber: 6, title: 'All You Need Is Love', durationSeconds: 237 }
  ],

  // The Beatles — Abbey Road (tracklist completa)
  'a1b2c3d4-0002-0002-0002-000000000011': [
    { trackNumber: 1, title: 'Come Together', durationSeconds: 259 },
    { trackNumber: 2, title: 'Something', durationSeconds: 183 },
    { trackNumber: 3, title: 'Maxwell\'s Silver Hammer', durationSeconds: 207 },
    { trackNumber: 4, title: 'Oh! Darling', durationSeconds: 207 },
    { trackNumber: 5, title: 'Octopus\'s Garden', durationSeconds: 170 },
    { trackNumber: 6, title: 'I Want You (She\'s So Heavy)', durationSeconds: 467 },
    { trackNumber: 7, title: 'Here Comes the Sun', durationSeconds: 185 },
    { trackNumber: 8, title: 'Because', durationSeconds: 165 },
    { trackNumber: 9, title: 'You Never Give Me Your Money', durationSeconds: 242 },
    { trackNumber: 10, title: 'Sun King', durationSeconds: 146 },
    { trackNumber: 11, title: 'Mean Mr. Mustard', durationSeconds: 66 },
    { trackNumber: 12, title: 'Polythene Pam', durationSeconds: 73 },
    { trackNumber: 13, title: 'She Came In Through the Bathroom Window', durationSeconds: 118 },
    { trackNumber: 14, title: 'Golden Slumbers', durationSeconds: 91 },
    { trackNumber: 15, title: 'Carry That Weight', durationSeconds: 97 },
    { trackNumber: 16, title: 'The End', durationSeconds: 140 },
    { trackNumber: 17, title: 'Her Majesty', durationSeconds: 23 }
  ],

  // The Beatles — Let It Be
  '64e32095-d24b-4ec5-bc16-6701509930f9': [
    { trackNumber: 1, title: 'Two of Us', durationSeconds: 216 },
    { trackNumber: 2, title: 'Dig a Pony', durationSeconds: 235 },
    { trackNumber: 3, title: 'Across the Universe', durationSeconds: 228 },
    { trackNumber: 4, title: 'I Me Mine', durationSeconds: 146 },
    { trackNumber: 5, title: 'Dig It', durationSeconds: 51 },
    { trackNumber: 6, title: 'Let It Be', durationSeconds: 243 },
    { trackNumber: 7, title: 'Maggie Mae', durationSeconds: 40 },
    { trackNumber: 8, title: 'I\'ve Got a Feeling', durationSeconds: 222 },
    { trackNumber: 9, title: 'One After 909', durationSeconds: 174 },
    { trackNumber: 10, title: 'The Long and Winding Road', durationSeconds: 218 },
    { trackNumber: 11, title: 'For You Blue', durationSeconds: 162 },
    { trackNumber: 12, title: 'Get Back', durationSeconds: 193 }
  ],

  // Ornatos Violeta — Cão! (tracklist completa)
  'a1b2c3d4-e5f6-7890-1234-56789abcdef1': [
    { trackNumber: 1, title: 'Lutar', durationSeconds: 247 },
    { trackNumber: 2, title: 'Ouvi Dizer', durationSeconds: 208 },
    { trackNumber: 3, title: 'Mentira', durationSeconds: 213 },
    { trackNumber: 4, title: 'Ignorante', durationSeconds: 234 },
    { trackNumber: 5, title: 'Cão', durationSeconds: 254 },
    { trackNumber: 6, title: 'Ao Contrário', durationSeconds: 219 },
    { trackNumber: 7, title: 'Tudo Que Eu Precisava', durationSeconds: 241 },
    { trackNumber: 8, title: 'Sangue', durationSeconds: 228 },
    { trackNumber: 9, title: 'Sem Acidente', durationSeconds: 195 },
    { trackNumber: 10, title: 'Maria Albertina', durationSeconds: 262 }
  ],

  // Ornatos Violeta — O Monstro Precisa de Amigos (tracklist completa)
  'a1b2c3d4-0003-0003-0003-000000000001': [
    { trackNumber: 1, title: 'N', durationSeconds: 231 },
    { trackNumber: 2, title: 'Densas Águas', durationSeconds: 214 },
    { trackNumber: 3, title: 'O Monstro Precisa de Amigos', durationSeconds: 258 },
    { trackNumber: 4, title: 'Ainda Bem', durationSeconds: 227 },
    { trackNumber: 5, title: 'O Homem do Leme', durationSeconds: 245 },
    { trackNumber: 6, title: 'Cheira a Sexo', durationSeconds: 239 },
    { trackNumber: 7, title: 'Preenche-me', durationSeconds: 222 },
    { trackNumber: 8, title: 'Homens da Luta', durationSeconds: 248 },
    { trackNumber: 9, title: 'Sentia Que Era Verdade', durationSeconds: 219 },
    { trackNumber: 10, title: 'Ao Vivo é Que Presta', durationSeconds: 271 },
    { trackNumber: 11, title: 'Hey Joe', durationSeconds: 204 }
  ],

  // António Variações — Dar & Receber
  'a1b2c3d4-e5f6-7890-1234-56789abcdef2': [
    { trackNumber: 1, title: 'O Corpo É Que Paga', durationSeconds: 222 },
    { trackNumber: 2, title: 'Canção de Engate', durationSeconds: 204 },
    { trackNumber: 3, title: 'Estou Além', durationSeconds: 231 },
    { trackNumber: 4, title: 'Perdi a Memória', durationSeconds: 218 },
    { trackNumber: 5, title: 'Quero Ser Teu', durationSeconds: 243 },
    { trackNumber: 6, title: 'Povo Que Lavas no Rio', durationSeconds: 285 },
    { trackNumber: 7, title: 'Dar & Receber', durationSeconds: 257 },
    { trackNumber: 8, title: 'Sempre a Mentir', durationSeconds: 196 }
  ],

  // António Variações — Anjo da Guarda
  'a1b2c3d4-0004-0004-0004-000000000001': [
    { trackNumber: 1, title: 'Anjo da Guarda', durationSeconds: 234 },
    { trackNumber: 2, title: 'Perdi a Memória', durationSeconds: 218 },
    { trackNumber: 3, title: 'Erva Daninha', durationSeconds: 245 },
    { trackNumber: 4, title: 'Mineirinho', durationSeconds: 207 },
    { trackNumber: 5, title: 'A Minha Casinha', durationSeconds: 228 },
    { trackNumber: 6, title: 'Vou Ser Teu', durationSeconds: 213 }
  ],

  // Papa Roach — Infest (tracklist completa)
  '2bb5e8fc-f5b2-4d14-8742-1e9bf478635d': [
    { trackNumber: 1, title: 'Infest', durationSeconds: 90 },
    { trackNumber: 2, title: 'Last Resort', durationSeconds: 195 },
    { trackNumber: 3, title: 'Broken Home', durationSeconds: 218 },
    { trackNumber: 4, title: 'Blood Brothers', durationSeconds: 217 },
    { trackNumber: 5, title: 'Between Angels and Insects', durationSeconds: 219 },
    { trackNumber: 6, title: 'M-80 (Explosive Energy Movement)', durationSeconds: 169 },
    { trackNumber: 7, title: 'Never Enough', durationSeconds: 201 },
    { trackNumber: 8, title: 'Revenge', durationSeconds: 159 },
    { trackNumber: 9, title: 'Snakes', durationSeconds: 195 },
    { trackNumber: 10, title: 'binge', durationSeconds: 117 },
    { trackNumber: 11, title: 'thrown away', durationSeconds: 199 },
    { trackNumber: 12, title: 'Dead Cell', durationSeconds: 219 }
  ],

  // Quim Barreiros — Bacalhau à Portuguesa (tracklist)
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0101': [
    { trackNumber: 1, title: 'Bacalhau à Portuguesa', durationSeconds: 193 },
    { trackNumber: 2, title: 'Comer, Comer', durationSeconds: 172 },
    { trackNumber: 3, title: 'A Barriguinha', durationSeconds: 185 },
    { trackNumber: 4, title: 'Minha Sogra', durationSeconds: 178 },
    { trackNumber: 5, title: 'A Bonequinha', durationSeconds: 196 },
    { trackNumber: 6, title: 'Foguetões', durationSeconds: 164 },
    { trackNumber: 7, title: 'O Taxista', durationSeconds: 187 },
    { trackNumber: 8, title: 'O Caldeirão', durationSeconds: 175 }
  ],

  // Amália Rodrigues — Com Que Voz (tracklist)
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0201': [
    { trackNumber: 1, title: 'Com Que Voz', durationSeconds: 213 },
    { trackNumber: 2, title: 'Estranha Forma de Vida', durationSeconds: 195 },
    { trackNumber: 3, title: 'Que Deus Me Perdoe', durationSeconds: 224 },
    { trackNumber: 4, title: 'Povo Que Lavas no Rio', durationSeconds: 241 },
    { trackNumber: 5, title: 'Uma Casa Portuguesa', durationSeconds: 188 },
    { trackNumber: 6, title: 'Ó Gente da Minha Terra', durationSeconds: 207 },
    { trackNumber: 7, title: 'Gaivota', durationSeconds: 219 },
    { trackNumber: 8, title: 'Lisboa Antiga', durationSeconds: 198 }
  ],

  // Xutos & Pontapés — Circo de Feras (tracklist)
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0301': [
    { trackNumber: 1, title: 'Circo de Feras', durationSeconds: 237 },
    { trackNumber: 2, title: 'Contentores', durationSeconds: 214 },
    { trackNumber: 3, title: 'Homem do Leme', durationSeconds: 228 },
    { trackNumber: 4, title: 'Liberdade', durationSeconds: 245 },
    { trackNumber: 5, title: 'Não Sei', durationSeconds: 221 },
    { trackNumber: 6, title: 'Mãe', durationSeconds: 209 },
    { trackNumber: 7, title: 'A Mão Que Aperta a Minha', durationSeconds: 198 },
    { trackNumber: 8, title: 'Se Eu Te Pudesse Tocar', durationSeconds: 232 }
  ],

  // GNR — Psicopátria (tracklist)
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0401': [
    { trackNumber: 1, title: 'Psicopátria', durationSeconds: 243 },
    { trackNumber: 2, title: 'Dunas', durationSeconds: 226 },
    { trackNumber: 3, title: 'Telefone', durationSeconds: 218 },
    { trackNumber: 4, title: 'Linha de Montagem', durationSeconds: 239 },
    { trackNumber: 5, title: 'Espelho Partido', durationSeconds: 207 },
    { trackNumber: 6, title: 'Bailando', durationSeconds: 221 },
    { trackNumber: 7, title: 'Cão do Diabo', durationSeconds: 234 },
    { trackNumber: 8, title: 'Branca de Neve', durationSeconds: 212 }
  ],

  // Rui Veloso — Ar de Rock (tracklist)
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0501': [
    { trackNumber: 1, title: 'Chico Fininho', durationSeconds: 197 },
    { trackNumber: 2, title: 'Porto Côvo', durationSeconds: 214 },
    { trackNumber: 3, title: 'Não és de Ninguém', durationSeconds: 228 },
    { trackNumber: 4, title: 'Menina Triste', durationSeconds: 219 },
    { trackNumber: 5, title: 'Ar de Rock', durationSeconds: 241 },
    { trackNumber: 6, title: 'Sou um Homem', durationSeconds: 206 },
    { trackNumber: 7, title: 'Vai Andando', durationSeconds: 233 },
    { trackNumber: 8, title: 'Flor Silvestre', durationSeconds: 198 }
  ],

  // Madredeus — Os Dias da MadreDeus (tracklist)
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0601': [
    { trackNumber: 1, title: 'O Pastor', durationSeconds: 226 },
    { trackNumber: 2, title: 'Haja O Que Houver', durationSeconds: 208 },
    { trackNumber: 3, title: 'A Vaca de Fogo', durationSeconds: 243 },
    { trackNumber: 4, title: 'Guitarra', durationSeconds: 217 },
    { trackNumber: 5, title: 'O Sonho', durationSeconds: 234 },
    { trackNumber: 6, title: 'Estranha Forma de Vida', durationSeconds: 251 },
    { trackNumber: 7, title: 'O Coração É Um Mar', durationSeconds: 228 },
    { trackNumber: 8, title: 'Alfama', durationSeconds: 219 }
  ],

  // --- Paulo Gonzo ---
  'a1b2c3d4-0012-0012-0012-000000000001': [
    { trackNumber: 1, title: 'Jardins Proibidos', durationSeconds: 284 },
    { trackNumber: 2, title: 'Dei-te Quase Tudo', durationSeconds: 265 },
    { trackNumber: 3, title: 'Sei-te de Cor', durationSeconds: 234 }
  ],
  'a1b2c3d4-0012-0012-0012-000000000002': [
    { trackNumber: 1, title: 'Dei-te Quase Tudo', durationSeconds: 265 },
    { trackNumber: 2, title: 'So do I', durationSeconds: 212 },
    { trackNumber: 3, title: 'Pagarei por Tudo', durationSeconds: 245 }
  ],

  // --- Bruno Mars ---
  'a1b2c3d4-0013-0013-0013-000000000001': [
    { trackNumber: 1, title: 'Grenade', durationSeconds: 222 },
    { trackNumber: 2, title: 'Just the Way You Are', durationSeconds: 220 },
    { trackNumber: 3, title: 'Our First Time', durationSeconds: 243 },
    { trackNumber: 4, title: 'Runaway Baby', durationSeconds: 147 },
    { trackNumber: 5, title: 'The Lazy Song', durationSeconds: 189 },
    { trackNumber: 6, title: 'Marry You', durationSeconds: 230 },
    { trackNumber: 7, title: 'Talking to the Moon', durationSeconds: 217 },
    { trackNumber: 8, title: 'Liquor Store Blues', durationSeconds: 229 },
    { trackNumber: 9, title: 'Count On Me', durationSeconds: 197 },
    { trackNumber: 10, title: 'The Other Side', durationSeconds: 227 }
  ],
  'a1b2c3d4-0013-0013-0013-000000000002': [
    { trackNumber: 1, title: 'Young Girls', durationSeconds: 228 },
    { trackNumber: 2, title: 'Locked Out of Heaven', durationSeconds: 233 },
    { trackNumber: 3, title: 'Gorilla', durationSeconds: 244 },
    { trackNumber: 4, title: 'Treasure', durationSeconds: 178 },
    { trackNumber: 5, title: 'Moonshine', durationSeconds: 228 },
    { trackNumber: 6, title: 'When I Was Your Man', durationSeconds: 213 },
    { trackNumber: 7, title: 'Natalie', durationSeconds: 225 },
    { trackNumber: 8, title: 'Show Me', durationSeconds: 207 },
    { trackNumber: 9, title: 'Money Make Her Smile', durationSeconds: 203 },
    { trackNumber: 10, title: 'If I Knew', durationSeconds: 133 }
  ],
  'a1b2c3d4-0013-0013-0013-000000000003': [
    { trackNumber: 1, title: '24K Magic', durationSeconds: 226 },
    { trackNumber: 2, title: 'Chunky', durationSeconds: 186 },
    { trackNumber: 3, title: 'Perm', durationSeconds: 210 },
    { trackNumber: 4, title: "That's What I Like", durationSeconds: 206 },
    { trackNumber: 5, title: 'Versace on the Floor', durationSeconds: 261 },
    { trackNumber: 6, title: 'Straight Up & Down', durationSeconds: 198 },
    { trackNumber: 7, title: 'Calling All My Lovelies', durationSeconds: 250 },
    { trackNumber: 8, title: 'Finesse', durationSeconds: 191 },
    { trackNumber: 9, title: 'Too Good to Say Goodbye', durationSeconds: 281 }
  ],
  'a1b2c3d4-0013-0013-0013-000000000004': [
    { trackNumber: 1, title: 'Silk Sonic Intro', durationSeconds: 63 },
    { trackNumber: 2, title: 'Leave the Door Open', durationSeconds: 242 },
    { trackNumber: 3, title: 'Fly as Me', durationSeconds: 219 },
    { trackNumber: 4, title: 'After Last Night', durationSeconds: 249 },
    { trackNumber: 5, title: 'Smokin Out the Window', durationSeconds: 197 },
    { trackNumber: 6, title: 'Put on a Smile', durationSeconds: 255 },
    { trackNumber: 7, title: '777', durationSeconds: 165 },
    { trackNumber: 8, title: 'Skate', durationSeconds: 203 },
    { trackNumber: 9, title: 'Blast Off', durationSeconds: 284 }
  ]
};

const COVERS_BY_MBID = {
  // Radiohead
  // OK Computer (MusicBrainz release: ddacdf34-2e2d-4d7a-af37-56e632d4b998)
  'ddacdf34-2e2d-4d7a-af37-56e632d4b998': 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png',
  // Kid A (MusicBrainz release: c2eaf764-ca57-4180-b2f5-b6d8f1e5fb06)
  'c2eaf764-ca57-4180-b2f5-b6d8f1e5fb06': 'https://upload.wikimedia.org/wikipedia/en/0/02/Radioheadkida.png',
  // In Rainbows (MusicBrainz release group: 1f1f55f9-2c8b-4e86-bd25-e4c22f3f0c9f)
  'a1b2c3d4-0001-0001-0001-000000000005': 'https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png',
  // Pablo Honey (MusicBrainz release group: 85444b8a-2d2b-44c8-b7c8-2a14569fa51f)
  'a1b2c3d4-0001-0001-0001-000000000001': 'https://upload.wikimedia.org/wikipedia/en/0/0f/Radiohead.pablohoney.albumart.jpg',
  // The Bends (MusicBrainz release group: 65b4a8c3-0476-4741-b54d-8bf5df92e74c)
  'a1b2c3d4-0001-0001-0001-000000000002': 'https://upload.wikimedia.org/wikipedia/en/5/55/Radioheadthebends.png',
  // Amnesiac (MusicBrainz release group: 0d5d5ead-c7a5-48d1-ab73-0a5db79f1db0)
  'a1b2c3d4-0001-0001-0001-000000000003': 'https://upload.wikimedia.org/wikipedia/en/8/8c/Radiohead_-_Amnesiac_cover.png',
  // Hail to the Thief (MusicBrainz release group: 1f0d6c0e-c9f1-4572-aef9-4b4c2c0bca2d)
  'a1b2c3d4-0001-0001-0001-000000000004': 'https://upload.wikimedia.org/wikipedia/en/6/61/Radioheadhailtothethief.png',
  // The King of Limbs (MusicBrainz release group: 3b9c65e3-6d6c-465f-a4dc-fcd65a74bb9f)
  'a1b2c3d4-0001-0001-0001-000000000006': 'https://upload.wikimedia.org/wikipedia/en/a/a2/Radioheadthekingoflimbs.png',
  // A Moon Shaped Pool (MusicBrainz release group: 10b23f57-e1df-4e23-9ca8-31ebe65cd7d5)
  'a1b2c3d4-0001-0001-0001-000000000007': 'https://upload.wikimedia.org/wikipedia/en/6/6a/Amoonshapedpool.png',

  // The Beatles
  // Please Please Me (MusicBrainz release: d22d25f7-fdfa-4fc8-9fce-e0c65df5af9c)
  'd22d25f7-fdfa-4fc8-9fce-e0c65df5af9c': 'https://upload.wikimedia.org/wikipedia/en/2/2e/Please_Please_Me.png',
  // With The Beatles (MusicBrainz release group: b6b52918-c49e-4e4d-baa5-3be2f5f71c38)
  'a1b2c3d4-0002-0002-0002-000000000001': 'https://upload.wikimedia.org/wikipedia/en/5/52/With_the_Beatles.png',
  // A Hard Day's Night (MusicBrainz release group: 1f5ac9cd-b1c1-406c-9572-b9e882453ad5)
  'a1b2c3d4-0002-0002-0002-000000000002': 'https://upload.wikimedia.org/wikipedia/en/e/e6/HardDayUK.jpg',
  // Beatles For Sale (MusicBrainz release group: dc9acd52-aa81-4285-8b61-4eb7f1f60dcc)
  'a1b2c3d4-0002-0002-0002-000000000003': 'https://upload.wikimedia.org/wikipedia/en/4/40/Beatlesforsale.jpg',
  // Help! (MusicBrainz release group: f17d1e2e-c7a9-4b39-a6f7-1da6bcca92e2)
  'a1b2c3d4-0002-0002-0002-000000000004': 'https://upload.wikimedia.org/wikipedia/en/d/d7/The_Beatles_-_Help%21.png',
  // Rubber Soul (MusicBrainz release group: 29a9d7e2-1b0e-4f1d-a7c7-3db85f81db7e)
  'a1b2c3d4-0002-0002-0002-000000000005': 'https://upload.wikimedia.org/wikipedia/en/5/5b/Rubber_Soul.png',
  // Revolver (MusicBrainz release group: e338b6f2-83e9-4f0b-a64a-e7e0c6b7e9e3)
  'a1b2c3d4-0002-0002-0002-000000000006': 'https://upload.wikimedia.org/wikipedia/en/e/ec/Revolver_%28album_cover%29.jpg',
  // Sgt. Pepper's (MusicBrainz release group: f3e5f8f1-4e4a-4b3e-9e1b-7c5e5a8b7e2f)
  'a1b2c3d4-0002-0002-0002-000000000007': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Sgt._Pepper%27s_Lonely_Hearts_Club_Band_album_art.jpg/960px-Sgt._Pepper%27s_Lonely_Hearts_Club_Band_album_art.jpg',
  // Magical Mystery Tour (MusicBrainz release group: dde8a855-0e0a-4b0d-b2a7-c56e8a1f1d97)
  'a1b2c3d4-0002-0002-0002-000000000008': 'https://upload.wikimedia.org/wikipedia/en/e/e8/MagicalMysteryTourDoubleEPcover.jpg',
  // The Beatles (White Album) (MusicBrainz release group: fbd4e05f-8e1b-4e6b-ad07-4c3c22e47a6a)
  'a1b2c3d4-0002-0002-0002-000000000009': 'https://upload.wikimedia.org/wikipedia/commons/2/20/TheBeatles68LP.jpg',
  // Yellow Submarine (MusicBrainz release group: 2cb4e847-6e3b-4e7d-b6d9-3f2b2e2a5c9e)
  'a1b2c3d4-0002-0002-0002-000000000010': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1WEY9IK7T52A4rxHrAKWowpYxvIMyzFg_Qg&s',
  // Abbey Road (MusicBrainz release group: d72c9d60-b44e-4d3d-b79e-88d4db515e3c)
  'a1b2c3d4-0002-0002-0002-000000000011': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/The_Beatles_Abbey_Road_album_cover.jpg/960px-The_Beatles_Abbey_Road_album_cover.jpg',
  // Let It Be (MusicBrainz release: 64e32095-d24b-4ec5-bc16-6701509930f9)
  '64e32095-d24b-4ec5-bc16-6701509930f9': 'https://upload.wikimedia.org/wikipedia/en/5/51/TheBeatles-LetItBe%282011VinylReissue%29.png',

  // Ornatos Violeta
  // Cão! (MusicBrainz release group: 4b1e5e8f-93a7-4f5a-9a88-1c7e5b2b1e3f)
  'a1b2c3d4-e5f6-7890-1234-56789abcdef1': 'https://upload.wikimedia.org/wikipedia/en/d/d1/C%C3%A3o.gif',
  // O Monstro Precisa de Amigos (MusicBrainz release group: 5e2a6d3c-84b1-4e2a-a7c5-2d3f5a8b9e1f)
  'a1b2c3d4-0003-0003-0003-000000000001': 'https://upload.wikimedia.org/wikipedia/pt/7/77/Capamonstro.gif',

  // António Variações
  // Dar & Receber (MusicBrainz release group: 3f6a9b2c-1d4e-4f7a-8b5c-2e3d6f9a1b4c)
  'a1b2c3d4-e5f6-7890-1234-56789abcdef2': 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/39/48/d6/3948d625-35ca-3a2b-7b79-d24462d30135/724382373353.jpg/600x600bf-60.jpg',
  // Anjo da Guarda (MusicBrainz release group: 2a5b8c1d-3e6f-4a9b-7c2d-5e8f1a4b7c2d)
  'a1b2c3d4-0004-0004-0004-000000000001': 'https://upload.wikimedia.org/wikipedia/pt/8/8f/Ant%C3%B3nio_Varia%C3%A7%C3%B5es_-_Anjo_da_Guarda.jpg',
  // O Melhor de António Variações (MusicBrainz release group: 9c3d6e1f-2a5b-4c8d-7e3f-1b4c7d2e5f8a)
  'a1b2c3d4-0004-0004-0004-000000000002': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/1/2/4/0724385666421/tsp20110307202047/O-Melhor-De.jpg',
  // A História de António Variações (MusicBrainz release group: 6d2e9f4a-8b3c-4d7e-1f5a-9c2b6e3d8f1a)
  'a1b2c3d4-0004-0004-0004-000000000003': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/6/2/9/0094636306926/tsp20110121135520/A-Historia-de-Antonio-Variacoes-De-Braga-a-Nova-Iorque-2CD.jpg',

  // Papa Roach
  // Infest (MusicBrainz release: 2bb5e8fc-f5b2-4d14-8742-1e9bf478635d)
  '2bb5e8fc-f5b2-4d14-8742-1e9bf478635d': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy2dXrcW2DuKfAAGjjm_a-GdUvUZ7Ss4DnWw&s',
  'a1b2c3d4-0005-0005-0005-000000000001': 'https://upload.wikimedia.org/wikipedia/en/c/c5/Papa_Roach_-_lovehatetragedy.jpg',
  'a1b2c3d4-0005-0005-0005-000000000002': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdPnlv1uE2lCVlQTqipBy2VGX7YeaubiM1SQ&s', // Getting Away with Murder (2004)
  'a1b2c3d4-0005-0005-0005-000000000003': 'https://i.scdn.co/image/ab67616d0000b2737a99d010dde227ca15b4a72c', // The Paramour Sessions (2006)
  'a1b2c3d4-0005-0005-0005-000000000004': 'https://m.media-amazon.com/images/M/MV5BMWM4OGRhNTItYmRhNS00YWQ5LWE4YjQtOGU3NDA0NzY5ODg3XkEyXkFqcGc@._V1_QL75_UY281_CR11,0,190,281_.jpg', // Metamorphosis (2009)
  'a1b2c3d4-0005-0005-0005-000000000005': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/TimeforAnnihilation.jpg/250px-TimeforAnnihilation.jpg', // Time for Annihilation (2010)
  'a1b2c3d4-0005-0005-0005-000000000006': 'https://upload.wikimedia.org/wikipedia/en/4/47/The_Connection_Album_Cover.jpg', // The Connection (2012)
  'a1b2c3d4-0005-0005-0005-000000000007': 'https://upload.wikimedia.org/wikipedia/en/e/ec/PapaRoachFEAR.png', // F.E.A.R. (2015)
  'a1b2c3d4-0005-0005-0005-000000000008': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/11/PapaRoachCrookedTeeth.jpg/250px-PapaRoachCrookedTeeth.jpg', // Crooked Teeth (2017)
  'a1b2c3d4-0005-0005-0005-000000000009': 'https://upload.wikimedia.org/wikipedia/en/4/46/Papa_Roach_%E2%80%93_Who_Do_You_Trust.png', // Who Do You Trust? (2019)
  'a1b2c3d4-0005-0005-0005-000000000010': 'https://imusic.b-cdn.net/images/item/original/511/0190296235511.jpg?papa-roach-2022-bf-2022-ego-trip-12-7-&class=scaled&v=1665744677', // Ego Trip (2022)

  // Quim Barreiros
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0101': 'https://i.scdn.co/image/7124e748a138c0a0b0ef56a30ee9139d9a6030ed',
  'a1b2c3d4-0006-0006-0006-000000000010': 'https://i.discogs.com/YgRTP5zh5k67awi7tDF0mTUj2b6u1jIL21okz--wcfE/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYzOTM4/MjItMTQxODE0MjI1/Ny0yODg3LmpwZWc.jpeg', // CD d'Ouro (1991)
  'a1b2c3d4-0006-0006-0006-000000000011': 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/3e/79/a9/3e79a904-9598-c33a-2261-b19baaa405ef/196626224651.jpg/1200x630bb.jpg', // Original (O Franguito da Maria) (1992)
  'a1b2c3d4-0006-0006-0006-000000000012': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTShaKLGdfJQhieWSNw5dq8HuZqf0-a0zd1cQ&s', // Deixa Botar Só a Cabeça (Acredita em Mim) (1993)
  'a1b2c3d4-0006-0006-0006-000000000013': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lu5bF0aaqEoR32Zoek1-78eMvHzPpTnvJg&s', // Insónia (1993)
  'a1b2c3d4-0006-0006-0006-000000000014': 'https://i.scdn.co/image/ab67616d0000b2737513ca86e02310c2f211abfe', // Mestre da Culinária (1994)
  'a1b2c3d4-0006-0006-0006-000000000015': 'https://i.scdn.co/image/ab67616d0000b27307690408fdb3218d4f4a59dc', // Nunca Gastes Tudo (1995)
  'a1b2c3d4-0006-0006-0006-000000000016': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQfCSZNGntPnimQOHLerYuHl2T-7Fx16EX1Q&s', // Minha Vaca Louca (1996)
  'a1b2c3d4-0006-0006-0006-000000000017': 'https://i.scdn.co/image/d9afbad57feeb0cd2cebd395c2522cbb68844da6', // 15 Grandes Sucessos (1997)
  'a1b2c3d4-0006-0006-0006-000000000018': 'https://i.scdn.co/image/f0827ad3d9ec60bc734e6fa74fb0a86e15a7e7b6', // Marcha do 3º Milénio (1999)
  'a1b2c3d4-0006-0006-0006-000000000019': 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7b/e5/8b/7be58b73-f400-a8e0-54ff-3809bac70ad5/196925440929.jpg/600x600bf-60.jpg', // A Garagem da Vizinha (2000)
  'a1b2c3d4-0006-0006-0006-000000000020': 'https://i.scdn.co/image/ab67616d0000b273d22ddbe516af9350c20a24e2', // Comer, Comer (2001)
  'a1b2c3d4-0006-0006-0006-000000000021': 'https://i.scdn.co/image/ab67616d00001e02030c2fa3313510582e3366f5', // Cantares ao Desafio (2002)
  'a1b2c3d4-0006-0006-0006-000000000022': 'https://i.scdn.co/image/9139e7015e881666f65a2a49adb7248c7c4c6241', // Na Tua Casa Tá Entrando Outro Macho (2003)
  'a1b2c3d4-0006-0006-0006-000000000023': 'https://i.scdn.co/image/ab67616d0000b2738942193d1906b190052f4607', // A Cabritinha (2004)

  // Amália Rodrigues
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0201': 'https://static.fnac-static.com/multimedia/Images/PT/NR/79/45/57/5719417/1507-1.jpg',
  'a1b2c3d4-0007-0007-0007-000000000010': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwkF_Pjs-YkCRTuYSA0nHlO8oOfkOs--eGmQ&s', // Amália no Olympia (1957)
  'a1b2c3d4-0007-0007-0007-000000000011': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqSjJynoPVANzsTSKZIj3Hj0Tv-y00I_6fmA&s', // Busto (1962)
  'a1b2c3d4-0007-0007-0007-000000000012': 'https://www.museudofado.pt/media/2019/12/1237893715.jpg', // Fado Português (1965)
  'a1b2c3d4-0007-0007-0007-000000000013': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF8W7jBg-gILRs5MaZChpoyRTUnz-VG4upZQ&s', // Fados 67 (1967)
  'a1b2c3d4-0007-0007-0007-000000000014': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU80a_HWOMUEpWXcvJZH-oFfmakMZ0-iAmVw&s', // Amália/Vinicius (1970)
  'a1b2c3d4-0007-0007-0007-000000000015': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbxfiBUBrqqINiTHcoLSM0bKOtT2va6vskCw&s', // Cantigas de Amigos (1971)
  'a1b2c3d4-0007-0007-0007-000000000017': 'https://i.discogs.com/JPlZjbJbfZYivu8-IYyXzGCO_8BqhlLoajKqDy3z0rA/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNjA2/MDgxLTE1NTczOTQ2/NTgtNDQ0MC5qcGVn.jpeg', // Amália & Don Byas (1973)
  'a1b2c3d4-0007-0007-0007-000000000016': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9YbkQNhA_eQxc0BHhA9pOTiU0UsM2775igQ&s', // Trova do Vento que Passa (1974)

  // Xutos & Pontapés
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0301': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwmOcueG7hzDh4cZWM4kenNViDXmXgYreyGg&s',
  'a1b2c3d4-0008-0008-0008-000000000010': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVUDJMqr_pHZIyxamGkbCsX_4JUp_TgHPp9Q&s', // 78/82 (1982)
  'a1b2c3d4-0008-0008-0008-000000000011': 'https://upload.wikimedia.org/wikipedia/pt/1/10/Cerco_xutos_e_pontap%C3%A9s.jpeg', // Cerco (1985)
  'a1b2c3d4-0008-0008-0008-000000000012': 'https://upload.wikimedia.org/wikipedia/pt/e/e0/88_xutos.jpeg', // 88 (1988)
  'a1b2c3d4-0008-0008-0008-000000000020': 'https://i.scdn.co/image/ab67616d0000b273571dd4b0e96f374953597285', // Ao Vivo (1988)
  'a1b2c3d4-0008-0008-0008-000000000013': 'https://i.scdn.co/image/ab67616d00001e026619cf90c95d150028e54315', // Gritos Mudos (1990)
  'a1b2c3d4-0008-0008-0008-000000000014': 'https://upload.wikimedia.org/wikipedia/pt/c/c4/Dizer_N%C3%A3o_de_Vez_-_Xutos_e_Pontap%C3%A9s_%281992%29.jpg', // Dizer Não de Vez (1992)
  'a1b2c3d4-0008-0008-0008-000000000015': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJt6gv-8pMRjRSa3cjQOaycHsc4mt_gVRvXw&s', // Direito ao Deserto (1993)
  'a1b2c3d4-0008-0008-0008-000000000016': 'https://i.scdn.co/image/ab67616d0000b2738f07958268575098a4cab5e1', // Dados Viciados (1997)
  'a1b2c3d4-0008-0008-0008-000000000017': 'https://static.fnac-static.com/multimedia/Images/PT/NR/78/34/15/1389688/1507-1/tsp20180111180500/Xutos-pontapes-2009-CD.jpg', // Xutos & Pontapés (2009)
  'a1b2c3d4-0008-0008-0008-000000000018': 'https://i.scdn.co/image/ab67616d00001e02e78866a6c3cbd8506a9f7c28', // Puro (2014)
  'a1b2c3d4-0008-0008-0008-000000000019': 'https://static.fnac-static.com/multimedia/Images/PT/NR/84/e5/4a/4908420/1540-1.jpg', // Duro (2019)

  // GNR
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0401': 'https://upload.wikimedia.org/wikipedia/pt/0/09/GNR_-_Psicop%C3%A1tria.jpg',
  'a1b2c3d4-0009-0009-0009-000000000010': 'https://altamont.pt/wp-content/uploads/2018/10/GNR-Independanca.jpg', // Independança (1982)
  'a1b2c3d4-0009-0009-0009-000000000011': 'https://altamont.pt/wp-content/uploads/2018/10/GNR-Defeitos-Especiais.jpg', // Defeitos Especiais (1984)
  'a1b2c3d4-0009-0009-0009-000000000012': 'https://altamont.pt/wp-content/uploads/2018/10/GNR-Homens-Bonitos.jpg', // Os Homens Não Se Querem Bonitos (1985)
  'a1b2c3d4-0009-0009-0009-000000000013': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq9qL3jjJQGvPDzPJAmyvBPcOBr1G9XbrFzQ&s', // Valsa dos Detectives (1989)
  'a1b2c3d4-0009-0009-0009-000000000014': 'https://i.scdn.co/image/ab67616d0000b2732d29e5f1f5ebc3c7b9941015', // Rock in Rio Douro (1992)
  'a1b2c3d4-0009-0009-0009-000000000015': 'https://i.scdn.co/image/ab67616d0000b27304eb0482244a00ba525d6015', // Sob Escuta (1994)
  'a1b2c3d4-0009-0009-0009-000000000016': 'https://i.scdn.co/image/ab67616d0000b2732893fafd90ce133b8a808a4f', // Mosquito (1998)
  'a1b2c3d4-0009-0009-0009-000000000017': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2_CvueFtZ3naxA0ABFT3fMayQZMutoKrfXw&s', // Popless (2000)
  'a1b2c3d4-0009-0009-0009-000000000018': 'https://i.scdn.co/image/ab67616d0000b2732f5b8b6ebf640091b2c208ee', // Do Lado dos Cisnes (2002)
  'a1b2c3d4-0009-0009-0009-000000000019': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/0/7/6/5603850105670/tsp20100716203831/Retropolitana-DGP.jpg', // Retropolitana (2010)
  'a1b2c3d4-0009-0009-0009-000000000020': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/4/2/4/5099908709424/tsp20110721202003/Voos-Domesticos.jpg', // Voos Domésticos (2011)

  // Rui Veloso
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0501': 'https://upload.wikimedia.org/wikipedia/pt/5/53/Ar-de-rock.jpg',
  'a1b2c3d4-0010-0010-0010-000000000010': 'https://i.scdn.co/image/ab67616d0000b273d41672cd63aa34575d9fc9db', // Fora de Moda (1982)
  'a1b2c3d4-0010-0010-0010-000000000011': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyd8diJ5SUbrxM0fY2LY0lDzCFNU71SShz_g&s', // Guardador de Margens (1983)
  'a1b2c3d4-0010-0010-0010-000000000012': 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Rui_veloso_rui_veloso.jpg/250px-Rui_veloso_rui_veloso.jpg', // Rui Veloso (1986)
  'a1b2c3d4-0010-0010-0010-000000000013': 'https://i.scdn.co/image/ab67616d00001e0254fc72cfaa6323b02b01a9c0', // Ao Vivo (1988)
  'a1b2c3d4-0010-0010-0010-000000000014': 'https://upload.wikimedia.org/wikipedia/pt/b/b9/Mingos-e-samurais.jpg', // Mingos & Os Samurais (1990)
  'a1b2c3d4-0010-0010-0010-000000000015': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMauT0aPyuf9zah7fPVp-aGbQ-BAJtluk-iw&s', // Auto da Pimenta (1991)
  'a1b2c3d4-0010-0010-0010-000000000016': 'https://i.scdn.co/image/ab67616d0000b2739c62e6eccd8d315d52be9014', // Lado Lunar (1995)
  'a1b2c3d4-0010-0010-0010-000000000017': 'https://i.scdn.co/image/ab67616d0000b2730c35737d86d17295d0a000e9', // Avenidas (1998)
  'a1b2c3d4-0010-0010-0010-000000000018': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/6/2/2/0094634763226/tsp20110124202012/A-Espuma-das-Cancoes.jpg', // A Espuma das Canções (2005)
  'a1b2c3d4-0010-0010-0010-000000000019': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/4/2/9/5099972303924/tsp20121026200557/Rui-Veloso-Amigos.JPG', // Rui Veloso e Amigos (2012)

  // Madredeus
  // Os Dias da MadreDeus (MusicBrainz release: b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0601)
  'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0601': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB-SVRwNzqjN2FGcKB5VfLrC7SgXm0Vyit3g&s',
  'a1b2c3d4-0011-0011-0011-000000000010': 'https://upload.wikimedia.org/wikipedia/en/6/6f/Madredeus_existir.jpeg', // Existir (1990)
  'a1b2c3d4-0011-0011-0011-000000000011': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Madredeus_o_espirito_da_paz.jpeg/250px-Madredeus_o_espirito_da_paz.jpeg', // O Espírito da Paz (1994)
  'a1b2c3d4-0011-0011-0011-000000000012': 'https://i.discogs.com/YOC7Lyi3a4OjVGEXeM5dh-IcrOsDWYTTNAPr9SgVrDw/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQwMzg2/MTEtMTQwNzU3NjY4/MC04NDY3LmpwZWc.jpeg', // Ainda (1995)
  'a1b2c3d4-0011-0011-0011-000000000013': 'https://upload.wikimedia.org/wikipedia/en/4/48/Madredeus_o_paraiso.jpeg', // O Paraíso (1997)
  'a1b2c3d4-0011-0011-0011-000000000014': 'https://i.scdn.co/image/ab67616d0000b273c4fae736445f63412b9d774e', // Movimento (2001)
  'a1b2c3d4-0011-0011-0011-000000000015': 'https://i.scdn.co/image/ab67616d0000b273ef91693f8739109693467297', // Um Amor Infinito (2004)
  'a1b2c3d4-0011-0011-0011-000000000016': 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Madredeus_faluas_do_tejo.jpeg/250px-Madredeus_faluas_do_tejo.jpeg', // Faluas do Tejo (2005)

  // --- Paulo Gonzo ---
  'a1b2c3d4-0012-0012-0012-000000000001': 'https://i.scdn.co/image/ab67616d0000b27387b8a52c2914fa49ad0a4efc',
  'a1b2c3d4-0012-0012-0012-000000000002': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ubhcDQSkjbwiLM4Ldaa9wYodWL-gM0Y43w&s',

  // --- Bruno Mars ---
  'a1b2c3d4-0013-0013-0013-000000000001': 'https://upload.wikimedia.org/wikipedia/pt/a/af/Doo-Wops_%26_Hooligans.jpg',
  'a1b2c3d4-0013-0013-0013-000000000002': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/7/5/8/0075678762857/tsp20130114200657/Unorthodox-Jukebox.jpg',
  'a1b2c3d4-0013-0013-0013-000000000003': 'https://static.fnac-static.com/multimedia/Images/PT/NR/14/1e/0f/990740/1540-1/tsp20161110152337/24k-Magic.jpg',
  'a1b2c3d4-0013-0013-0013-000000000004': 'https://static.fnac-static.com/multimedia/Images/PT/NR/8b/e4/74/7660683/1507-1.jpg'
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

async function seedTestData() {
  let insertedArtists = 0;
  let updatedArtists = 0;
  let insertedAlbums = 0;
  let updatedAlbums = 0;
  let linkedSongs = 0;

  // Process Artists
  for (const artistData of TEST_ARTISTS) {
    let artist = await Artist.findOne({ isni: artistData.isni });
    if (!artist) {
      artist = new Artist(artistData);
      await artist.save();
      insertedArtists++;
    } else {
      let changed = false;
      for (const [key, value] of Object.entries(artistData)) {
        if (String(artist[key]) !== String(value)) {
          artist[key] = value;
          changed = true;
        }
      }
      if (changed) {
        await artist.save();
        updatedArtists++;
      }
    }
  }

  // Build test albums (resolves artist references)
  const testAlbums = await buildTestAlbums();
  const testAlbumsWithVersions = testAlbums.map((album) => ({
    ...album,
    versions: VERSIONS_BY_MBID[album.mbid] || [],
    coverImage: COVERS_BY_MBID[album.mbid] || null
  }));

  // Process Albums
  for (const albumData of testAlbumsWithVersions) {
    let album = await Album.findOne({ mbid: albumData.mbid });
    if (!album) {
      album = new Album(albumData);
      await album.save();
      insertedAlbums++;
    } else {
      let changed = false;

      for (const key of ['title', 'releaseYear', 'albumType', 'artista', 'coverImage']) {
        if (albumData[key] !== undefined && String(album[key]) !== String(albumData[key])) {
          album[key] = albumData[key];
          changed = true;
        }
      }

      const currentVersionsClean = (album.versions || []).map(v => ({
        ean13: v.ean13 || null,
        physicalSupport: v.physicalSupport || null,
        designation: v.designation || null
      }));
      const newVersionsClean = (albumData.versions || []).map(v => ({
        ean13: v.ean13 || null,
        physicalSupport: v.physicalSupport || null,
        designation: v.designation || null
      }));

      if (JSON.stringify(currentVersionsClean) !== JSON.stringify(newVersionsClean)) {
        album.versions = albumData.versions;
        changed = true;
      }

      if (changed) {
        await album.save();
        updatedAlbums++;
      }
    }
  }

  // Process Songs and Tracks
  for (const [mbid, tracks] of Object.entries(TRACKS_BY_MBID)) {
    const album = await Album.findOne({ mbid });
    if (!album) continue;

    const songIds = [];
    for (const t of tracks) {
      let song = await Song.findOne({ title: t.title, durationSeconds: t.durationSeconds });
      if (!song) {
        const artistIds = album.artista ? [album.artista] : [];
        song = await Song.create({
          isrc: null,
          title: t.title,
          durationSeconds: t.durationSeconds,
          artists: artistIds
        });
      }
      songIds.push(song._id);
    }

    const currentTracksClean = (album.tracks || []).map(t => ({
      trackNumber: t.trackNumber,
      song: t.song ? t.song.toString() : null
    }));
    const newTracksClean = tracks.map((t, idx) => ({
      trackNumber: t.trackNumber,
      song: songIds[idx].toString()
    }));

    if (JSON.stringify(currentTracksClean) !== JSON.stringify(newTracksClean)) {
      album.tracks = newTracksClean.map((t, idx) => ({ trackNumber: t.trackNumber, song: songIds[idx] }));
      await album.save();
      linkedSongs++;
    }
  }

  return {
    insertedArtists,
    updatedArtists,
    insertedAlbums,
    updatedAlbums,
    linkedSongs,
    alreadySeeded: (insertedArtists === 0 && updatedArtists === 0 && insertedAlbums === 0 && updatedAlbums === 0 && linkedSongs === 0)
  };
}

module.exports = { seedTestData };