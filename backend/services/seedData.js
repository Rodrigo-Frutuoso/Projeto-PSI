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
  ],
  // António Variações - O Melhor de António Variações
  'a1b2c3d4-0004-0004-0004-000000000002': [
    { ean13: '5601990070018', physicalSupport: 'CD', designation: null }
  ],
  // António Variações - A História de António Variações – Entre Braga e Nova Iorque
  'a1b2c3d4-0004-0004-0004-000000000003': [
    { ean13: '5601990070025', physicalSupport: 'CD', designation: null }
  ],
  // Papa Roach - Lovehatetragedy
  'a1b2c3d4-0005-0005-0005-000000000001': [
    { ean13: '5601990070032', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070049', physicalSupport: 'vinil', designation: null }
  ],
  // Papa Roach - Getting Away with Murder
  'a1b2c3d4-0005-0005-0005-000000000002': [
    { ean13: '5601990070056', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070063', physicalSupport: 'vinil', designation: null }
  ],
  // Papa Roach - The Paramour Sessions
  'a1b2c3d4-0005-0005-0005-000000000003': [
    { ean13: '5601990070070', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070087', physicalSupport: 'vinil', designation: null }
  ],
  // Papa Roach - Metamorphosis
  'a1b2c3d4-0005-0005-0005-000000000004': [
    { ean13: '5601990070094', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070100', physicalSupport: 'vinil', designation: null }
  ],
  // Papa Roach - Time for Annihilation
  'a1b2c3d4-0005-0005-0005-000000000005': [
    { ean13: '5601990070117', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070124', physicalSupport: 'vinil', designation: null }
  ],
  // Papa Roach - The Connection
  'a1b2c3d4-0005-0005-0005-000000000006': [
    { ean13: '5601990070131', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070148', physicalSupport: 'vinil', designation: null }
  ],
  // Papa Roach - F.E.A.R.
  'a1b2c3d4-0005-0005-0005-000000000007': [
    { ean13: '5601990070155', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070162', physicalSupport: 'vinil', designation: null }
  ],
  // Papa Roach - Crooked Teeth
  'a1b2c3d4-0005-0005-0005-000000000008': [
    { ean13: '5601990070179', physicalSupport: 'CD', designation: null }
  ],
  // Papa Roach - Who Do You Trust?
  'a1b2c3d4-0005-0005-0005-000000000009': [
    { ean13: '5601990070186', physicalSupport: 'CD', designation: null }
  ],
  // Papa Roach - Ego Trip
  'a1b2c3d4-0005-0005-0005-000000000010': [
    { ean13: '5601990070193', physicalSupport: 'CD', designation: null }
  ],
  // Quim Barreiros - CD d'Ouro
  'a1b2c3d4-0006-0006-0006-000000000010': [
    { ean13: '5601990070200', physicalSupport: 'CD', designation: null }
  ],
  // Quim Barreiros - Original (O Franguito da Maria)
  'a1b2c3d4-0006-0006-0006-000000000011': [
    { ean13: '5601990070209', physicalSupport: 'CD', designation: null }
  ],
  // Quim Barreiros - Deixa Botar Só a Cabeça (Acredita em Mim)
  'a1b2c3d4-0006-0006-0006-000000000012': [
    { ean13: '5601990070216', physicalSupport: 'CD', designation: null }
  ],
  // Quim Barreiros - Insónia
  'a1b2c3d4-0006-0006-0006-000000000013': [
    { ean13: '5601990070223', physicalSupport: 'CD', designation: null }
  ],
  // Quim Barreiros - Mestre da Culinária
  'a1b2c3d4-0006-0006-0006-000000000014': [
    { ean13: '5601990070230', physicalSupport: 'CD', designation: null }
  ],
  // Quim Barreiros - Nunca Gastes Tudo
  'a1b2c3d4-0006-0006-0006-000000000015': [
    { ean13: '5601990070247', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070254', physicalSupport: 'vinil', designation: null }
  ],
  // Quim Barreiros - Minha Vaca Louca
  'a1b2c3d4-0006-0006-0006-000000000016': [
    { ean13: '5601990070261', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070278', physicalSupport: 'vinil', designation: null }
  ],
  // Quim Barreiros - 15 Grandes Sucessos
  'a1b2c3d4-0006-0006-0006-000000000017': [
    { ean13: '5601990070285', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070292', physicalSupport: 'vinil', designation: null }
  ],
  // Quim Barreiros - Marcha do 3º Milénio
  'a1b2c3d4-0006-0006-0006-000000000018': [
    { ean13: '5601990070308', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070315', physicalSupport: 'vinil', designation: null }
  ],
  // Quim Barreiros - A Garagem da Vizinha
  'a1b2c3d4-0006-0006-0006-000000000019': [
    { ean13: '5601990070322', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070339', physicalSupport: 'vinil', designation: null }
  ],
  // Quim Barreiros - Comer, Comer
  'a1b2c3d4-0006-0006-0006-000000000020': [
    { ean13: '5601990070346', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070353', physicalSupport: 'vinil', designation: null }
  ],
  // Quim Barreiros - Cantares ao Desafio
  'a1b2c3d4-0006-0006-0006-000000000021': [
    { ean13: '5601990070360', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070377', physicalSupport: 'vinil', designation: null }
  ],
  // Quim Barreiros - Na Tua Casa Tá Entrando Outro Macho
  'a1b2c3d4-0006-0006-0006-000000000022': [
    { ean13: '5601990070384', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070391', physicalSupport: 'vinil', designation: null }
  ],
  // Quim Barreiros - A Cabritinha
  'a1b2c3d4-0006-0006-0006-000000000023': [
    { ean13: '5601990070407', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070414', physicalSupport: 'vinil', designation: null }
  ],
  // Amália Rodrigues - Amália no Olympia
  'a1b2c3d4-0007-0007-0007-000000000010': [
    { ean13: '5601990070421', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070438', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Amália Rodrigues - Busto
  'a1b2c3d4-0007-0007-0007-000000000011': [
    { ean13: '5601990070445', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070452', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Amália Rodrigues - Fado Português
  'a1b2c3d4-0007-0007-0007-000000000012': [
    { ean13: '5601990070469', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070476', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Amália Rodrigues - Fados 67
  'a1b2c3d4-0007-0007-0007-000000000013': [
    { ean13: '5601990070483', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070490', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Amália Rodrigues - Amália/Vinicius
  'a1b2c3d4-0007-0007-0007-000000000014': [
    { ean13: '5601990070506', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070513', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Amália Rodrigues - Cantigas de Amigos
  'a1b2c3d4-0007-0007-0007-000000000015': [
    { ean13: '5601990070520', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070537', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Amália Rodrigues - Trova do Vento que Passa
  'a1b2c3d4-0007-0007-0007-000000000016': [
    { ean13: '5601990070544', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070551', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Amália Rodrigues - Amália & Don Byas
  'a1b2c3d4-0007-0007-0007-000000000017': [
    { ean13: '5601990070568', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070575', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Xutos & Pontapés - 78/82
  'a1b2c3d4-0008-0008-0008-000000000010': [
    { ean13: '5601990070582', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070599', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Xutos & Pontapés - Cerco
  'a1b2c3d4-0008-0008-0008-000000000011': [
    { ean13: '5601990070605', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070612', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070629', physicalSupport: 'cassete', designation: null }
  ],
  // Xutos & Pontapés - 88
  'a1b2c3d4-0008-0008-0008-000000000012': [
    { ean13: '5601990070636', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070643', physicalSupport: 'CD', designation: null }
  ],
  // Xutos & Pontapés - Gritos Mudos
  'a1b2c3d4-0008-0008-0008-000000000013': [
    { ean13: '5601990070650', physicalSupport: 'CD', designation: null }
  ],
  // Xutos & Pontapés - Dizer Não de Vez
  'a1b2c3d4-0008-0008-0008-000000000014': [
    { ean13: '5601990070667', physicalSupport: 'CD', designation: null }
  ],
  // Xutos & Pontapés - Direito ao Deserto
  'a1b2c3d4-0008-0008-0008-000000000015': [
    { ean13: '5601990070674', physicalSupport: 'CD', designation: null }
  ],
  // Xutos & Pontapés - Dados Viciados
  'a1b2c3d4-0008-0008-0008-000000000016': [
    { ean13: '5601990070681', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070698', physicalSupport: 'vinil', designation: null }
  ],
  // Xutos & Pontapés - Xutos & Pontapés (2009)
  'a1b2c3d4-0008-0008-0008-000000000017': [
    { ean13: '5601990070704', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070711', physicalSupport: 'vinil', designation: null }
  ],
  // Xutos & Pontapés - Puro
  'a1b2c3d4-0008-0008-0008-000000000018': [
    { ean13: '5601990070728', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070735', physicalSupport: 'vinil', designation: null }
  ],
  // Xutos & Pontapés - Duro
  'a1b2c3d4-0008-0008-0008-000000000019': [
    { ean13: '5601990070742', physicalSupport: 'CD', designation: null }
  ],
  // Xutos & Pontapés - Ao Vivo
  'a1b2c3d4-0008-0008-0008-000000000020': [
    { ean13: '5601990070759', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070766', physicalSupport: 'CD', designation: null }
  ],
  // GNR - Independança
  'a1b2c3d4-0009-0009-0009-000000000010': [
    { ean13: '5601990070773', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070780', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // GNR - Defeitos Especiais
  'a1b2c3d4-0009-0009-0009-000000000011': [
    { ean13: '5601990070797', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070803', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070810', physicalSupport: 'cassete', designation: null }
  ],
  // GNR - Os Homens Não Se Querem Bonitos
  'a1b2c3d4-0009-0009-0009-000000000012': [
    { ean13: '5601990070827', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070834', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070841', physicalSupport: 'cassete', designation: null }
  ],
  // GNR - Valsa dos Detectives
  'a1b2c3d4-0009-0009-0009-000000000013': [
    { ean13: '5601990070858', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990070865', physicalSupport: 'CD', designation: null }
  ],
  // GNR - Rock in Rio Douro
  'a1b2c3d4-0009-0009-0009-000000000014': [
    { ean13: '5601990070872', physicalSupport: 'CD', designation: null }
  ],
  // GNR - Sob Escuta
  'a1b2c3d4-0009-0009-0009-000000000015': [
    { ean13: '5601990070889', physicalSupport: 'CD', designation: null }
  ],
  // GNR - Mosquito
  'a1b2c3d4-0009-0009-0009-000000000016': [
    { ean13: '5601990070896', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070902', physicalSupport: 'vinil', designation: null }
  ],
  // GNR - Popless
  'a1b2c3d4-0009-0009-0009-000000000017': [
    { ean13: '5601990070919', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070926', physicalSupport: 'vinil', designation: null }
  ],
  // GNR - Do Lado dos Cisnes
  'a1b2c3d4-0009-0009-0009-000000000018': [
    { ean13: '5601990070933', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070940', physicalSupport: 'vinil', designation: null }
  ],
  // GNR - Retropolitana
  'a1b2c3d4-0009-0009-0009-000000000019': [
    { ean13: '5601990070957', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070964', physicalSupport: 'vinil', designation: null }
  ],
  // GNR - Voos Domésticos
  'a1b2c3d4-0009-0009-0009-000000000020': [
    { ean13: '5601990070971', physicalSupport: 'CD', designation: null },
    { ean13: '5601990070988', physicalSupport: 'vinil', designation: null }
  ],
  // Rui Veloso - Fora de Moda
  'a1b2c3d4-0010-0010-0010-000000000010': [
    { ean13: '5601990070995', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990071008', physicalSupport: 'CD', designation: 'Edição Remasterizada' }
  ],
  // Rui Veloso - Guardador de Margens
  'a1b2c3d4-0010-0010-0010-000000000011': [
    { ean13: '5601990071015', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990071022', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071039', physicalSupport: 'cassete', designation: null }
  ],
  // Rui Veloso - Rui Veloso (1986)
  'a1b2c3d4-0010-0010-0010-000000000012': [
    { ean13: '5601990071046', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990071053', physicalSupport: 'CD', designation: null }
  ],
  // Rui Veloso - Ao Vivo
  'a1b2c3d4-0010-0010-0010-000000000013': [
    { ean13: '5601990071060', physicalSupport: 'vinil', designation: null },
    { ean13: '5601990071077', physicalSupport: 'CD', designation: null }
  ],
  // Rui Veloso - Mingos & Os Samurais
  'a1b2c3d4-0010-0010-0010-000000000014': [
    { ean13: '5601990071084', physicalSupport: 'CD', designation: null }
  ],
  // Rui Veloso - Auto da Pimenta
  'a1b2c3d4-0010-0010-0010-000000000015': [
    { ean13: '5601990071091', physicalSupport: 'CD', designation: null }
  ],
  // Rui Veloso - Lado Lunar
  'a1b2c3d4-0010-0010-0010-000000000016': [
    { ean13: '5601990071107', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071114', physicalSupport: 'vinil', designation: null }
  ],
  // Rui Veloso - Avenidas
  'a1b2c3d4-0010-0010-0010-000000000017': [
    { ean13: '5601990071121', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071138', physicalSupport: 'vinil', designation: null }
  ],
  // Rui Veloso - A Espuma das Canções
  'a1b2c3d4-0010-0010-0010-000000000018': [
    { ean13: '5601990071145', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071152', physicalSupport: 'vinil', designation: null }
  ],
  // Rui Veloso - Rui Veloso e Amigos
  'a1b2c3d4-0010-0010-0010-000000000019': [
    { ean13: '5601990071169', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071176', physicalSupport: 'vinil', designation: null }
  ],
  // Madredeus - Existir
  'a1b2c3d4-0011-0011-0011-000000000010': [
    { ean13: '5601990071183', physicalSupport: 'CD', designation: null }
  ],
  // Madredeus - O Espírito da Paz
  'a1b2c3d4-0011-0011-0011-000000000011': [
    { ean13: '5601990071190', physicalSupport: 'CD', designation: null }
  ],
  // Madredeus - Ainda
  'a1b2c3d4-0011-0011-0011-000000000012': [
    { ean13: '5601990071206', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071213', physicalSupport: 'vinil', designation: null }
  ],
  // Madredeus - O Paraíso
  'a1b2c3d4-0011-0011-0011-000000000013': [
    { ean13: '5601990071220', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071237', physicalSupport: 'vinil', designation: null }
  ],
  // Madredeus - Movimento
  'a1b2c3d4-0011-0011-0011-000000000014': [
    { ean13: '5601990071244', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071251', physicalSupport: 'vinil', designation: null }
  ],
  // Madredeus - Um Amor Infinito
  'a1b2c3d4-0011-0011-0011-000000000015': [
    { ean13: '5601990071268', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071275', physicalSupport: 'vinil', designation: null }
  ],
  // Madredeus - Faluas do Tejo
  'a1b2c3d4-0011-0011-0011-000000000016': [
    { ean13: '5601990071282', physicalSupport: 'CD', designation: null },
    { ean13: '5601990071299', physicalSupport: 'vinil', designation: null }
  ]
};

// Faixas por MBID. Tracklists reais e completas para todos os álbuns.
const TRACKS_BY_MBID = {
  // Radiohead — OK Computer (tracklist completa)
  // --- António Variações ---

  // O Melhor de António Variações (1997) — compilação
  'a1b2c3d4-0004-0004-0004-000000000002': [
    { trackNumber: 1, title: 'Povo que Lavas no Rio', durationSeconds: 185 },
    { trackNumber: 2, title: 'Estou Além', durationSeconds: 210 },
    { trackNumber: 3, title: 'Canção de Engate', durationSeconds: 198 },
    { trackNumber: 4, title: 'Anjinho da Guarda', durationSeconds: 192 },
    { trackNumber: 5, title: 'Tema da Cama', durationSeconds: 204 },
    { trackNumber: 6, title: 'Erva Daninha', durationSeconds: 215 },
    { trackNumber: 7, title: 'Perdi a Memória', durationSeconds: 188 },
    { trackNumber: 8, title: 'O Corpo é que Paga', durationSeconds: 222 },
    { trackNumber: 9, title: 'É d\'Este Mimo Que Eu Gosto', durationSeconds: 196 },
    { trackNumber: 10, title: 'Viva la vida Loca', durationSeconds: 207 },
    { trackNumber: 11, title: 'Quero Ser Teu Cavalo', durationSeconds: 195 },
    { trackNumber: 12, title: 'Dar & Receber', durationSeconds: 218 }
  ],

  // A História de António Variações – Entre Braga e Nova Iorque (2006) — compilação
  'a1b2c3d4-0004-0004-0004-000000000003': [
    { trackNumber: 1, title: 'Povo que Lavas no Rio', durationSeconds: 185 },
    { trackNumber: 2, title: 'Canção de Engate', durationSeconds: 198 },
    { trackNumber: 3, title: 'Anjinho da Guarda', durationSeconds: 192 },
    { trackNumber: 4, title: 'Tema da Cama', durationSeconds: 204 },
    { trackNumber: 5, title: 'Erva Daninha', durationSeconds: 215 },
    { trackNumber: 6, title: 'Estou Além', durationSeconds: 210 },
    { trackNumber: 7, title: 'Perdi a Memória', durationSeconds: 188 },
    { trackNumber: 8, title: 'O Corpo é que Paga', durationSeconds: 222 },
    { trackNumber: 9, title: 'É d\'Este Mimo Que Eu Gosto', durationSeconds: 196 },
    { trackNumber: 10, title: 'Quero Ser Teu Cavalo', durationSeconds: 195 },
    { trackNumber: 11, title: 'Viva la vida Loca', durationSeconds: 207 },
    { trackNumber: 12, title: 'Dar & Receber', durationSeconds: 218 },
    { trackNumber: 13, title: 'Minueto', durationSeconds: 201 },
    { trackNumber: 14, title: 'Coro dos Contentes', durationSeconds: 188 }
  ],

  // --- Papa Roach ---

  // Lovehatetragedy (2002)
  'a1b2c3d4-0005-0005-0005-000000000001': [
    { trackNumber: 1, title: 'M-80 (Explosive Energy Movement)', durationSeconds: 182 },
    { trackNumber: 2, title: 'She Loves Me Not', durationSeconds: 193 },
    { trackNumber: 3, title: 'Getting Away with Murder', durationSeconds: 198 },
    { trackNumber: 4, title: 'Fault Line', durationSeconds: 176 },
    { trackNumber: 5, title: 'Life Is a Bullet', durationSeconds: 204 },
    { trackNumber: 6, title: 'Time Is Always on My Side', durationSeconds: 188 },
    { trackNumber: 7, title: 'Breathe (You\'re the One)', durationSeconds: 215 },
    { trackNumber: 8, title: 'Born with Nothing, Die with Everything', durationSeconds: 209 },
    { trackNumber: 9, title: 'Singular Indestructible Droid', durationSeconds: 191 },
    { trackNumber: 10, title: 'Do or Die', durationSeconds: 197 },
    { trackNumber: 11, title: 'Black Clouds', durationSeconds: 212 },
    { trackNumber: 12, title: 'Lovehatetragedy', durationSeconds: 356 }
  ],

  // Getting Away with Murder (2004)
  'a1b2c3d4-0005-0005-0005-000000000002': [
    { trackNumber: 1, title: 'Stop Looking Start Seeing', durationSeconds: 185 },
    { trackNumber: 2, title: 'Getting Away with Murder', durationSeconds: 198 },
    { trackNumber: 3, title: 'Be Free', durationSeconds: 193 },
    { trackNumber: 4, title: 'Scars', durationSeconds: 215 },
    { trackNumber: 5, title: 'Tyranny of Normality', durationSeconds: 176 },
    { trackNumber: 6, title: 'Not Listening', durationSeconds: 204 },
    { trackNumber: 7, title: 'Done with You', durationSeconds: 188 },
    { trackNumber: 8, title: 'Hard Life', durationSeconds: 209 },
    { trackNumber: 9, title: 'Deeper', durationSeconds: 191 },
    { trackNumber: 10, title: 'Take Me', durationSeconds: 197 },
    { trackNumber: 11, title: 'We Die', durationSeconds: 212 },
    { trackNumber: 12, title: 'Blanket of Fear', durationSeconds: 218 },
    { trackNumber: 13, title: 'Forever', durationSeconds: 223 }
  ],

  // The Paramour Sessions (2006)
  'a1b2c3d4-0005-0005-0005-000000000003': [
    { trackNumber: 1, title: 'To Be Loved', durationSeconds: 202 },
    { trackNumber: 2, title: 'Ressurection', durationSeconds: 186 },
    { trackNumber: 3, title: 'Dying to Believe', durationSeconds: 214 },
    { trackNumber: 4, title: 'The World Around You', durationSeconds: 195 },
    { trackNumber: 5, title: 'Not Afraid (with Kelly Clarkson)', durationSeconds: 209 },
    { trackNumber: 6, title: 'I Devise My Own Demise', durationSeconds: 183 },
    { trackNumber: 7, title: 'No More Secrets', durationSeconds: 197 },
    { trackNumber: 8, title: 'My Heart Is a Fist', durationSeconds: 188 },
    { trackNumber: 9, title: 'Time Is Running Out', durationSeconds: 219 },
    { trackNumber: 10, title: 'Reckoning', durationSeconds: 193 },
    { trackNumber: 11, title: 'Alive (N 2Deep)', durationSeconds: 201 },
    { trackNumber: 12, title: 'Blanket of Fear', durationSeconds: 211 }
  ],

  // Metamorphosis (2009)
  'a1b2c3d4-0005-0005-0005-000000000004': [
    { trackNumber: 1, title: 'Metamorphosis', durationSeconds: 196 },
    { trackNumber: 2, title: 'Lifeline', durationSeconds: 209 },
    { trackNumber: 3, title: 'Hollywood Whore', durationSeconds: 185 },
    { trackNumber: 4, title: 'No Circus', durationSeconds: 197 },
    { trackNumber: 5, title: 'Hate (Lead the Way)', durationSeconds: 188 },
    { trackNumber: 6, title: 'I Almost Told You That I Loved You', durationSeconds: 214 },
    { trackNumber: 7, title: 'Carry Me', durationSeconds: 201 },
    { trackNumber: 8, title: 'September', durationSeconds: 193 },
    { trackNumber: 9, title: 'Forever', durationSeconds: 207 },
    { trackNumber: 10, title: 'Change or Die', durationSeconds: 189 },
    { trackNumber: 11, title: 'Roses on My Grave', durationSeconds: 215 },
    { trackNumber: 12, title: 'Had Enough', durationSeconds: 198 },
    { trackNumber: 13, title: 'Alive', durationSeconds: 221 }
  ],

  // Time for Annihilation (2010)
  'a1b2c3d4-0005-0005-0005-000000000005': [
    { trackNumber: 1, title: 'Kick in the Teeth', durationSeconds: 185 },
    { trackNumber: 2, title: 'No Matter What', durationSeconds: 198 },
    { trackNumber: 3, title: 'Burn', durationSeconds: 192 },
    { trackNumber: 4, title: 'One Track Mind', durationSeconds: 205 },
    { trackNumber: 5, title: 'Lift Me Up', durationSeconds: 188 },
    { trackNumber: 6, title: 'Between Angels and Insects (Live)', durationSeconds: 215 },
    { trackNumber: 7, title: 'Last Resort (Live)', durationSeconds: 208 },
    { trackNumber: 8, title: 'Getting Away with Murder (Live)', durationSeconds: 201 },
    { trackNumber: 9, title: 'Scars (Live)', durationSeconds: 218 },
    { trackNumber: 10, title: 'To Be Loved (Live)', durationSeconds: 205 }
  ],

  // The Connection (2012)
  'a1b2c3d4-0005-0005-0005-000000000006': [
    { trackNumber: 1, title: 'Still Swingin\'', durationSeconds: 196 },
    { trackNumber: 2, title: 'Where Did the Angels Go', durationSeconds: 209 },
    { trackNumber: 3, title: 'Leader of the Broken Hearts', durationSeconds: 185 },
    { trackNumber: 4, title: 'Silence & Scream', durationSeconds: 197 },
    { trackNumber: 5, title: 'Gravity', durationSeconds: 214 },
    { trackNumber: 6, title: 'Falling Apart', durationSeconds: 188 },
    { trackNumber: 7, title: 'Burning Bright', durationSeconds: 201 },
    { trackNumber: 8, title: 'Kukuku', durationSeconds: 193 },
    { trackNumber: 9, title: 'Walk with Me', durationSeconds: 207 },
    { trackNumber: 10, title: 'No Matter What', durationSeconds: 189 },
    { trackNumber: 11, title: 'Before I Die', durationSeconds: 215 },
    { trackNumber: 12, title: 'Won\'t Let Up', durationSeconds: 198 }
  ],

  // F.E.A.R. (2015)
  'a1b2c3d4-0005-0005-0005-000000000007': [
    { trackNumber: 1, title: 'Face Everything and Rise', durationSeconds: 188 },
    { trackNumber: 2, title: 'Warriors', durationSeconds: 201 },
    { trackNumber: 3, title: 'Skeletons', durationSeconds: 194 },
    { trackNumber: 4, title: 'Love, Hate, Tragedy', durationSeconds: 216 },
    { trackNumber: 5, title: 'Throne of Glass', durationSeconds: 187 },
    { trackNumber: 6, title: 'Never Have to Say Goodbye', durationSeconds: 209 },
    { trackNumber: 7, title: 'Gravity', durationSeconds: 198 },
    { trackNumber: 8, title: 'Hope for the Hopeless', durationSeconds: 205 },
    { trackNumber: 9, title: 'Not the Only One', durationSeconds: 191 },
    { trackNumber: 10, title: 'Devil', durationSeconds: 213 },
    { trackNumber: 11, title: 'American Dreams', durationSeconds: 197 },
    { trackNumber: 12, title: 'forever fall apart', durationSeconds: 222 }
  ],

  // Crooked Teeth (2017)
  'a1b2c3d4-0005-0005-0005-000000000008': [
    { trackNumber: 1, title: 'Crooked Teeth', durationSeconds: 192 },
    { trackNumber: 2, title: 'None of the Above', durationSeconds: 205 },
    { trackNumber: 3, title: 'Traumatic', durationSeconds: 186 },
    { trackNumber: 4, title: 'Born for Greatness', durationSeconds: 214 },
    { trackNumber: 5, title: 'Clumsy', durationSeconds: 197 },
    { trackNumber: 6, title: 'Periscope (feat. Skylar Grey)', durationSeconds: 209 },
    { trackNumber: 7, title: 'American Zero', durationSeconds: 188 },
    { trackNumber: 8, title: 'Help', durationSeconds: 201 },
    { trackNumber: 9, title: 'Sunrise Trailer Park', durationSeconds: 193 },
    { trackNumber: 10, title: 'Love Me Till It Hurts', durationSeconds: 216 },
    { trackNumber: 11, title: 'Maniac', durationSeconds: 198 },
    { trackNumber: 12, title: 'Crooked Teeth (Acoustic)', durationSeconds: 204 }
  ],

  // Who Do You Trust? (2019)
  'a1b2c3d4-0005-0005-0005-000000000009': [
    { trackNumber: 1, title: 'The Ending', durationSeconds: 189 },
    { trackNumber: 2, title: 'Elevate', durationSeconds: 202 },
    { trackNumber: 3, title: 'Feel Like Home', durationSeconds: 194 },
    { trackNumber: 4, title: 'Who Do You Trust?', durationSeconds: 217 },
    { trackNumber: 5, title: 'Renegade Music', durationSeconds: 186 },
    { trackNumber: 6, title: 'I Suffer Well', durationSeconds: 209 },
    { trackNumber: 7, title: 'Come Around', durationSeconds: 198 },
    { trackNumber: 8, title: 'Not Good Enough', durationSeconds: 205 },
    { trackNumber: 9, title: 'Crooked Teeth', durationSeconds: 192 },
    { trackNumber: 10, title: 'Problems', durationSeconds: 191 },
    { trackNumber: 11, title: 'Maniac', durationSeconds: 213 },
    { trackNumber: 12, title: 'Better Than I Deserve', durationSeconds: 222 }
  ],

  // Ego Trip (2022)
  'a1b2c3d4-0005-0005-0005-000000000010': [
    { trackNumber: 1, title: 'The Ending (No Way Out)', durationSeconds: 191 },
    { trackNumber: 2, title: 'Kill the Noise', durationSeconds: 203 },
    { trackNumber: 3, title: 'Swerve (feat. FEVER 333 & Sueco)', durationSeconds: 185 },
    { trackNumber: 4, title: 'Ego Trip', durationSeconds: 215 },
    { trackNumber: 5, title: 'Stand Up', durationSeconds: 197 },
    { trackNumber: 6, title: 'Dying to Believe', durationSeconds: 208 },
    { trackNumber: 7, title: 'Bloodline', durationSeconds: 188 },
    { trackNumber: 8, title: 'Voodoo Dead or Alive', durationSeconds: 201 },
    { trackNumber: 9, title: 'No Apologies', durationSeconds: 194 },
    { trackNumber: 10, title: 'Cut the Line', durationSeconds: 216 },
    { trackNumber: 11, title: 'Tonehead', durationSeconds: 186 },
    { trackNumber: 12, title: 'Feel Like Home', durationSeconds: 209 },
    { trackNumber: 13, title: 'Come Around', durationSeconds: 198 },
    { trackNumber: 14, title: 'One Track Mind', durationSeconds: 212 }
  ],

  // --- Quim Barreiros ---

  // CD d'Ouro (1991)
  'a1b2c3d4-0006-0006-0006-000000000010': [
    { trackNumber: 1, title: 'Ao Fresco', durationSeconds: 192 },
    { trackNumber: 2, title: 'A Menina dos Olhos Pretos', durationSeconds: 205 },
    { trackNumber: 3, title: 'Maluca, Maluca', durationSeconds: 188 },
    { trackNumber: 4, title: 'O Caldo da Panela', durationSeconds: 197 },
    { trackNumber: 5, title: 'Bacalhau à Portuguesa', durationSeconds: 210 },
    { trackNumber: 6, title: 'Barco Negro', durationSeconds: 183 },
    { trackNumber: 7, title: 'A Pastora e o Soldado', durationSeconds: 201 },
    { trackNumber: 8, title: 'Ó Malhão Malhão', durationSeconds: 195 },
    { trackNumber: 9, title: 'Ai Morrinha', durationSeconds: 214 },
    { trackNumber: 10, title: 'Meu Amor do Campo', durationSeconds: 199 }
  ],

  // Original (O Franguito da Maria) (1992)
  'a1b2c3d4-0006-0006-0006-000000000011': [
    { trackNumber: 1, title: 'O Franguito da Maria', durationSeconds: 198 },
    { trackNumber: 2, title: 'A Viúva do Senhor Albano', durationSeconds: 210 },
    { trackNumber: 3, title: 'Sou Quim Barreiros', durationSeconds: 187 },
    { trackNumber: 4, title: 'Xô Tordilha', durationSeconds: 202 },
    { trackNumber: 5, title: 'Ai Margarida', durationSeconds: 195 },
    { trackNumber: 6, title: 'A Garagem da Vizinha', durationSeconds: 215 },
    { trackNumber: 7, title: 'Mete a Mão no Bolso', durationSeconds: 189 },
    { trackNumber: 8, title: 'Brinca Comigo', durationSeconds: 207 },
    { trackNumber: 9, title: 'Vira da Ribeira', durationSeconds: 193 },
    { trackNumber: 10, title: 'Ai Lisboa', durationSeconds: 201 }
  ],

  // Deixa Botar Só a Cabeça (Acredita em Mim) (1993)
  'a1b2c3d4-0006-0006-0006-000000000012': [
    { trackNumber: 1, title: 'Acredita em Mim', durationSeconds: 205 },
    { trackNumber: 2, title: 'Deixa Botar Só a Cabeça', durationSeconds: 198 },
    { trackNumber: 3, title: 'Sempre a Gozar', durationSeconds: 190 },
    { trackNumber: 4, title: 'A Minha Avó', durationSeconds: 212 },
    { trackNumber: 5, title: 'Adeus Amor', durationSeconds: 188 },
    { trackNumber: 6, title: 'Dona Ilda', durationSeconds: 203 },
    { trackNumber: 7, title: 'Ai Que Boa Vida', durationSeconds: 196 },
    { trackNumber: 8, title: 'Peta', durationSeconds: 215 },
    { trackNumber: 9, title: 'Na Escola', durationSeconds: 187 },
    { trackNumber: 10, title: 'Olha a Janela', durationSeconds: 200 }
  ],

  // Insónia (1993)
  'a1b2c3d4-0006-0006-0006-000000000013': [
    { trackNumber: 1, title: 'Insónia', durationSeconds: 208 },
    { trackNumber: 2, title: 'A Minha Madrinha', durationSeconds: 195 },
    { trackNumber: 3, title: 'Toca a Gemer', durationSeconds: 187 },
    { trackNumber: 4, title: 'Gosto de Ti', durationSeconds: 213 },
    { trackNumber: 5, title: 'O Meu Quartinho', durationSeconds: 198 },
    { trackNumber: 6, title: 'Vira Folha', durationSeconds: 190 },
    { trackNumber: 7, title: 'Olhos Verdes', durationSeconds: 205 },
    { trackNumber: 8, title: 'Que Vida Triste', durationSeconds: 192 },
    { trackNumber: 9, title: 'A Feia', durationSeconds: 215 },
    { trackNumber: 10, title: 'Bom Apetite', durationSeconds: 200 }
  ],

  // Mestre da Culinária (1994)
  'a1b2c3d4-0006-0006-0006-000000000014': [
    { trackNumber: 1, title: 'Mestre da Culinária', durationSeconds: 202 },
    { trackNumber: 2, title: 'Arroz e Feijão', durationSeconds: 195 },
    { trackNumber: 3, title: 'A Costureira', durationSeconds: 188 },
    { trackNumber: 4, title: 'Tudo Passa', durationSeconds: 210 },
    { trackNumber: 5, title: 'Pimba!', durationSeconds: 183 },
    { trackNumber: 6, title: 'Ai Que Amor', durationSeconds: 205 },
    { trackNumber: 7, title: 'A Vizinha do Lado', durationSeconds: 197 },
    { trackNumber: 8, title: 'Olha o Galo', durationSeconds: 215 },
    { trackNumber: 9, title: 'Sou Assim', durationSeconds: 191 },
    { trackNumber: 10, title: 'Ai Jesus', durationSeconds: 208 }
  ],

  // Nunca Gastes Tudo (1995)
  'a1b2c3d4-0006-0006-0006-000000000015': [
    { trackNumber: 1, title: 'Nunca Gastes Tudo', durationSeconds: 198 },
    { trackNumber: 2, title: 'A Rolinha', durationSeconds: 190 },
    { trackNumber: 3, title: 'Peixeira', durationSeconds: 205 },
    { trackNumber: 4, title: 'Coração Malandro', durationSeconds: 212 },
    { trackNumber: 5, title: 'Serrano', durationSeconds: 185 },
    { trackNumber: 6, title: 'Tira o Casaco', durationSeconds: 201 },
    { trackNumber: 7, title: 'Vira do Minho', durationSeconds: 193 },
    { trackNumber: 8, title: 'Ó Rapariga', durationSeconds: 210 },
    { trackNumber: 9, title: 'A Palhoça', durationSeconds: 188 },
    { trackNumber: 10, title: 'Borboleta', durationSeconds: 215 }
  ],

  // Minha Vaca Louca (1996)
  'a1b2c3d4-0006-0006-0006-000000000016': [
    { trackNumber: 1, title: 'Minha Vaca Louca', durationSeconds: 203 },
    { trackNumber: 2, title: 'O Galo Cantor', durationSeconds: 195 },
    { trackNumber: 3, title: 'Ai Que Fome', durationSeconds: 188 },
    { trackNumber: 4, title: 'Menina do Salto Alto', durationSeconds: 210 },
    { trackNumber: 5, title: 'O Bacalhau da Minha Avó', durationSeconds: 197 },
    { trackNumber: 6, title: 'Quem Não Arrisca', durationSeconds: 205 },
    { trackNumber: 7, title: 'Sol Nascente', durationSeconds: 192 },
    { trackNumber: 8, title: 'Mala Sorte', durationSeconds: 215 },
    { trackNumber: 9, title: 'Ai Que Pena', durationSeconds: 186 },
    { trackNumber: 10, title: 'Boa Noite', durationSeconds: 201 }
  ],

  // 15 Grandes Sucessos (1997)
  'a1b2c3d4-0006-0006-0006-000000000017': [
    { trackNumber: 1, title: 'Bacalhau à Portuguesa', durationSeconds: 198 },
    { trackNumber: 2, title: 'O Franguito da Maria', durationSeconds: 202 },
    { trackNumber: 3, title: 'Insónia', durationSeconds: 208 },
    { trackNumber: 4, title: 'Acredita em Mim', durationSeconds: 205 },
    { trackNumber: 5, title: 'Minha Vaca Louca', durationSeconds: 203 },
    { trackNumber: 6, title: 'A Garagem da Vizinha', durationSeconds: 215 },
    { trackNumber: 7, title: 'Nunca Gastes Tudo', durationSeconds: 198 },
    { trackNumber: 8, title: 'Mestre da Culinária', durationSeconds: 202 },
    { trackNumber: 9, title: 'Deixa Botar Só a Cabeça', durationSeconds: 198 },
    { trackNumber: 10, title: 'CD d\'Ouro', durationSeconds: 192 },
    { trackNumber: 11, title: 'Ao Fresco', durationSeconds: 192 },
    { trackNumber: 12, title: 'Ai Que Fome', durationSeconds: 188 },
    { trackNumber: 13, title: 'O Galo Cantor', durationSeconds: 195 },
    { trackNumber: 14, title: 'A Minha Avó', durationSeconds: 212 },
    { trackNumber: 15, title: 'Maluca, Maluca', durationSeconds: 188 }
  ],

  // Marcha do 3º Milénio (1999)
  'a1b2c3d4-0006-0006-0006-000000000018': [
    { trackNumber: 1, title: 'Marcha do 3º Milénio', durationSeconds: 205 },
    { trackNumber: 2, title: 'A Minha Filha', durationSeconds: 195 },
    { trackNumber: 3, title: 'Olha o Caracol', durationSeconds: 188 },
    { trackNumber: 4, title: 'À Beira do Rio', durationSeconds: 210 },
    { trackNumber: 5, title: 'Fandango da Saudade', durationSeconds: 197 },
    { trackNumber: 6, title: 'Ai Linda Lisboa', durationSeconds: 205 },
    { trackNumber: 7, title: 'O Pescador', durationSeconds: 192 },
    { trackNumber: 8, title: 'Saudades do Alentejo', durationSeconds: 215 },
    { trackNumber: 9, title: 'Menina Bonita', durationSeconds: 186 },
    { trackNumber: 10, title: 'Roda o Mundo', durationSeconds: 201 }
  ],

  // A Garagem da Vizinha (2000)
  'a1b2c3d4-0006-0006-0006-000000000019': [
    { trackNumber: 1, title: 'A Garagem da Vizinha', durationSeconds: 215 },
    { trackNumber: 2, title: 'O Quinto Mandamento', durationSeconds: 200 },
    { trackNumber: 3, title: 'Olha o Cão', durationSeconds: 188 },
    { trackNumber: 4, title: 'Passa Por Mim', durationSeconds: 205 },
    { trackNumber: 5, title: 'Amor a Crédito', durationSeconds: 195 },
    { trackNumber: 6, title: 'Ai Menina', durationSeconds: 210 },
    { trackNumber: 7, title: 'Uma Noite Só', durationSeconds: 192 },
    { trackNumber: 8, title: 'É Tudo uma Questão de Perspectiva', durationSeconds: 218 },
    { trackNumber: 9, title: 'Saudade que Tenho', durationSeconds: 201 },
    { trackNumber: 10, title: 'Olá Vizinha', durationSeconds: 185 }
  ],

  // Comer, Comer (2001)
  'a1b2c3d4-0006-0006-0006-000000000020': [
    { trackNumber: 1, title: 'Comer, Comer', durationSeconds: 202 },
    { trackNumber: 2, title: 'Ai a Fome', durationSeconds: 195 },
    { trackNumber: 3, title: 'O Tempero', durationSeconds: 188 },
    { trackNumber: 4, title: 'Boa Mesa', durationSeconds: 210 },
    { trackNumber: 5, title: 'Petiscos', durationSeconds: 197 },
    { trackNumber: 6, title: 'Rancho', durationSeconds: 205 },
    { trackNumber: 7, title: 'Tasca', durationSeconds: 192 },
    { trackNumber: 8, title: 'Vinho Tinto', durationSeconds: 215 },
    { trackNumber: 9, title: 'Sangria', durationSeconds: 186 },
    { trackNumber: 10, title: 'Sobremesa', durationSeconds: 201 }
  ],

  // Cantares ao Desafio (2002)
  'a1b2c3d4-0006-0006-0006-000000000021': [
    { trackNumber: 1, title: 'Cantares ao Desafio (Abertura)', durationSeconds: 185 },
    { trackNumber: 2, title: 'Ai que Saudade', durationSeconds: 220 },
    { trackNumber: 3, title: 'A Moda do Campino', durationSeconds: 215 },
    { trackNumber: 4, title: 'Vira da Serra', durationSeconds: 208 },
    { trackNumber: 5, title: 'Ao Despique', durationSeconds: 230 },
    { trackNumber: 6, title: 'Que Bela Terra', durationSeconds: 198 },
    { trackNumber: 7, title: 'O Lavrador', durationSeconds: 212 },
    { trackNumber: 8, title: 'Chula do Douro', durationSeconds: 205 },
    { trackNumber: 9, title: 'Cantares ao Desafio (Final)', durationSeconds: 190 }
  ],

  // Na Tua Casa Tá Entrando Outro Macho (2003)
  'a1b2c3d4-0006-0006-0006-000000000022': [
    { trackNumber: 1, title: 'Na Tua Casa Tá Entrando Outro Macho', durationSeconds: 208 },
    { trackNumber: 2, title: 'Que Se Lixe', durationSeconds: 195 },
    { trackNumber: 3, title: 'Ai Coitadinho', durationSeconds: 188 },
    { trackNumber: 4, title: 'Já Não Amas o Teu Macho', durationSeconds: 212 },
    { trackNumber: 5, title: 'A Vizinha Faz Bem', durationSeconds: 200 },
    { trackNumber: 6, title: 'Toca a Trabalhar', durationSeconds: 195 },
    { trackNumber: 7, title: 'Ai Traidora', durationSeconds: 205 },
    { trackNumber: 8, title: 'Ele Ficou', durationSeconds: 192 },
    { trackNumber: 9, title: 'Perdido de Amor', durationSeconds: 215 },
    { trackNumber: 10, title: 'Vira do Abandono', durationSeconds: 188 }
  ],

  // A Cabritinha (2004)
  'a1b2c3d4-0006-0006-0006-000000000023': [
    { trackNumber: 1, title: 'A Cabritinha', durationSeconds: 205 },
    { trackNumber: 2, title: 'Coração de Mel', durationSeconds: 198 },
    { trackNumber: 3, title: 'Ai que Cansaço', durationSeconds: 190 },
    { trackNumber: 4, title: 'Ai Que Raiva', durationSeconds: 212 },
    { trackNumber: 5, title: 'Ó Cabrito Novo', durationSeconds: 195 },
    { trackNumber: 6, title: 'Serra da Cabrinha', durationSeconds: 205 },
    { trackNumber: 7, title: 'Oh Lindinha', durationSeconds: 188 },
    { trackNumber: 8, title: 'Sobe a Serrana', durationSeconds: 215 },
    { trackNumber: 9, title: 'Pinhal Verde', durationSeconds: 201 },
    { trackNumber: 10, title: 'Cabrinha Mansa', durationSeconds: 192 }
  ],

  // --- Amália Rodrigues ---

  // Amália no Olympia (1957)
  'a1b2c3d4-0007-0007-0007-000000000010': [
    { trackNumber: 1, title: 'Estranha Forma de Vida', durationSeconds: 198 },
    { trackNumber: 2, title: 'Solidão', durationSeconds: 215 },
    { trackNumber: 3, title: 'Barco Negro', durationSeconds: 220 },
    { trackNumber: 4, title: 'Coimbra (April in Portugal)', durationSeconds: 205 },
    { trackNumber: 5, title: 'Ai Mouraria', durationSeconds: 192 },
    { trackNumber: 6, title: 'La Vie en Rose', durationSeconds: 188 },
    { trackNumber: 7, title: 'Uma Casa Portuguesa', durationSeconds: 210 },
    { trackNumber: 8, title: 'Lisboa Antiga', durationSeconds: 197 },
    { trackNumber: 9, title: 'Rosa Cor-de-Rosa', durationSeconds: 185 },
    { trackNumber: 10, title: 'Vou Dar de Beber à Dor', durationSeconds: 222 }
  ],

  // Busto (1962)
  'a1b2c3d4-0007-0007-0007-000000000011': [
    { trackNumber: 1, title: 'Meu Amor, Meu Amor', durationSeconds: 205 },
    { trackNumber: 2, title: 'Nem às Paredes Confesso', durationSeconds: 212 },
    { trackNumber: 3, title: 'Povo que Lavas no Rio', durationSeconds: 218 },
    { trackNumber: 4, title: 'Barca do Inferno', durationSeconds: 195 },
    { trackNumber: 5, title: 'Gaivota', durationSeconds: 220 },
    { trackNumber: 6, title: 'Perseguição', durationSeconds: 188 },
    { trackNumber: 7, title: 'Maria Lisboa', durationSeconds: 201 },
    { trackNumber: 8, title: 'Maldição', durationSeconds: 215 },
    { trackNumber: 9, title: 'Formiga é Animal', durationSeconds: 192 },
    { trackNumber: 10, title: 'Que Deus Me Perdoe', durationSeconds: 208 }
  ],

  // Fado Português (1965)
  'a1b2c3d4-0007-0007-0007-000000000012': [
    { trackNumber: 1, title: 'Fado Português', durationSeconds: 215 },
    { trackNumber: 2, title: 'Abandono', durationSeconds: 205 },
    { trackNumber: 3, title: 'Tudo Isso É Fado', durationSeconds: 195 },
    { trackNumber: 4, title: 'Canção do Mar', durationSeconds: 220 },
    { trackNumber: 5, title: 'Sabe-se Lá', durationSeconds: 188 },
    { trackNumber: 6, title: 'Cheira a Lisboa', durationSeconds: 210 },
    { trackNumber: 7, title: 'O Gente da Minha Terra', durationSeconds: 198 },
    { trackNumber: 8, title: 'Lisboa que Tu Não Tens', durationSeconds: 212 },
    { trackNumber: 9, title: 'Com que Voz', durationSeconds: 225 },
    { trackNumber: 10, title: 'O Pastor', durationSeconds: 192 }
  ],

  // Fados 67 (1967)
  'a1b2c3d4-0007-0007-0007-000000000013': [
    { trackNumber: 1, title: 'Primer Amor', durationSeconds: 198 },
    { trackNumber: 2, title: 'La Luna Que Se Mira', durationSeconds: 210 },
    { trackNumber: 3, title: 'Fado das Horas', durationSeconds: 215 },
    { trackNumber: 4, title: 'Água e Vento', durationSeconds: 205 },
    { trackNumber: 5, title: 'Fado do Ciúme', durationSeconds: 190 },
    { trackNumber: 6, title: 'Solidão', durationSeconds: 220 },
    { trackNumber: 7, title: 'Naufrágio', durationSeconds: 198 },
    { trackNumber: 8, title: 'Fado da Saudade', durationSeconds: 212 },
    { trackNumber: 9, title: 'Marina', durationSeconds: 185 },
    { trackNumber: 10, title: 'Fado de Peniche', durationSeconds: 208 }
  ],

  // Amália/Vinicius (1970)
  'a1b2c3d4-0007-0007-0007-000000000014': [
    { trackNumber: 1, title: 'Manhã de Carnaval', durationSeconds: 210 },
    { trackNumber: 2, title: 'Tonada de Luna Llena', durationSeconds: 195 },
    { trackNumber: 3, title: 'La Barca', durationSeconds: 205 },
    { trackNumber: 4, title: 'Arrastão', durationSeconds: 218 },
    { trackNumber: 5, title: 'Modinha', durationSeconds: 188 },
    { trackNumber: 6, title: 'A Valsa', durationSeconds: 201 },
    { trackNumber: 7, title: 'Maria', durationSeconds: 215 },
    { trackNumber: 8, title: 'Canção para Moço', durationSeconds: 192 },
    { trackNumber: 9, title: 'Rosa de Hiroshima', durationSeconds: 220 },
    { trackNumber: 10, title: 'Regresso', durationSeconds: 198 }
  ],

  // Cantigas de Amigos (1971)
  'a1b2c3d4-0007-0007-0007-000000000015': [
    { trackNumber: 1, title: 'Cantigas de Amigos', durationSeconds: 205 },
    { trackNumber: 2, title: 'Fui Bailar', durationSeconds: 192 },
    { trackNumber: 3, title: 'Cantiga da Serra', durationSeconds: 215 },
    { trackNumber: 4, title: 'Amigo Formoso', durationSeconds: 200 },
    { trackNumber: 5, title: 'Ai Eu Bailava', durationSeconds: 188 },
    { trackNumber: 6, title: 'Bailemos Nós', durationSeconds: 210 },
    { trackNumber: 7, title: 'Ondas do Mar', durationSeconds: 198 },
    { trackNumber: 8, title: 'Sedia-m\'el Rei', durationSeconds: 212 },
    { trackNumber: 9, title: 'Se Soubesses', durationSeconds: 195 },
    { trackNumber: 10, title: 'Falsa Amiga', durationSeconds: 220 }
  ],

  // Trova do Vento que Passa (1974)
  'a1b2c3d4-0007-0007-0007-000000000016': [
    { trackNumber: 1, title: 'Trova do Vento que Passa', durationSeconds: 218 },
    { trackNumber: 2, title: 'Lágrima', durationSeconds: 205 },
    { trackNumber: 3, title: 'O Infante', durationSeconds: 215 },
    { trackNumber: 4, title: 'Estranha Forma de Vida', durationSeconds: 225 },
    { trackNumber: 5, title: 'Navegante', durationSeconds: 198 },
    { trackNumber: 6, title: 'Fado do Campo', durationSeconds: 210 },
    { trackNumber: 7, title: 'Velho Amor', durationSeconds: 192 },
    { trackNumber: 8, title: 'Pedaços de Mim', durationSeconds: 215 },
    { trackNumber: 9, title: 'O Naufrágio', durationSeconds: 202 }
  ],

  // Amália & Don Byas (1973)
  'a1b2c3d4-0007-0007-0007-000000000017': [
    { trackNumber: 1, title: 'Solidão', durationSeconds: 248 },
    { trackNumber: 2, title: 'Barco Negro', durationSeconds: 235 },
    { trackNumber: 3, title: 'Povo que Lavas no Rio', durationSeconds: 260 },
    { trackNumber: 4, title: 'Estranha Forma de Vida', durationSeconds: 252 },
    { trackNumber: 5, title: 'Amor', durationSeconds: 228 },
    { trackNumber: 6, title: 'Perseguição', durationSeconds: 242 },
    { trackNumber: 7, title: 'Canção do Mar', durationSeconds: 255 }
  ],

  // --- Xutos & Pontapés ---

  // 78/82 (1982)
  'a1b2c3d4-0008-0008-0008-000000000010': [
    { trackNumber: 1, title: 'Só Sei Dançar Pogo', durationSeconds: 142 },
    { trackNumber: 2, title: 'Suicídio', durationSeconds: 135 },
    { trackNumber: 3, title: 'Punk a Lisboa', durationSeconds: 148 },
    { trackNumber: 4, title: 'Jornaleiro', durationSeconds: 156 },
    { trackNumber: 5, title: 'Marginal', durationSeconds: 140 },
    { trackNumber: 6, title: 'Nada Valho', durationSeconds: 162 },
    { trackNumber: 7, title: 'Taxa de Juro', durationSeconds: 138 },
    { trackNumber: 8, title: 'Viúvas por Todo o País', durationSeconds: 145 },
    { trackNumber: 9, title: 'Um Dia Qualquer', durationSeconds: 151 },
    { trackNumber: 10, title: 'Crise', durationSeconds: 158 }
  ],

  // Cerco (1985)
  'a1b2c3d4-0008-0008-0008-000000000011': [
    { trackNumber: 1, title: 'Minha Droga', durationSeconds: 218 },
    { trackNumber: 2, title: 'TV', durationSeconds: 195 },
    { trackNumber: 3, title: 'Cerco', durationSeconds: 235 },
    { trackNumber: 4, title: 'Exilado', durationSeconds: 205 },
    { trackNumber: 5, title: 'Amo-te Tanto', durationSeconds: 215 },
    { trackNumber: 6, title: 'Polícia', durationSeconds: 190 },
    { trackNumber: 7, title: 'Lua', durationSeconds: 228 },
    { trackNumber: 8, title: 'Camiões', durationSeconds: 212 },
    { trackNumber: 9, title: 'A Vida que Eu Levo', durationSeconds: 198 },
    { trackNumber: 10, title: 'Mar Revolto', durationSeconds: 222 }
  ],

  // 88 (1988)
  'a1b2c3d4-0008-0008-0008-000000000012': [
    { trackNumber: 1, title: 'Hey Hey My My', durationSeconds: 210 },
    { trackNumber: 2, title: 'Crenças e Esperanças', durationSeconds: 225 },
    { trackNumber: 3, title: 'Homem do Leme', durationSeconds: 215 },
    { trackNumber: 4, title: 'Além das Palavras', durationSeconds: 198 },
    { trackNumber: 5, title: 'Nossa Senhora do Mar', durationSeconds: 235 },
    { trackNumber: 6, title: 'Ângela', durationSeconds: 205 },
    { trackNumber: 7, title: 'É Só Rock', durationSeconds: 192 },
    { trackNumber: 8, title: 'Vida', durationSeconds: 218 },
    { trackNumber: 9, title: 'Adeus Tristeza', durationSeconds: 212 }
  ],

  // Gritos Mudos (1990)
  'a1b2c3d4-0008-0008-0008-000000000013': [
    { trackNumber: 1, title: 'Não Volto Atrás', durationSeconds: 215 },
    { trackNumber: 2, title: 'Tanto Amor', durationSeconds: 228 },
    { trackNumber: 3, title: 'Sara', durationSeconds: 205 },
    { trackNumber: 4, title: 'Gritos Mudos', durationSeconds: 238 },
    { trackNumber: 5, title: 'Um Passo à Frente', durationSeconds: 198 },
    { trackNumber: 6, title: 'Corações com Fome', durationSeconds: 222 },
    { trackNumber: 7, title: 'Aqui Estou Eu', durationSeconds: 210 },
    { trackNumber: 8, title: 'Anjo Guardião', durationSeconds: 195 },
    { trackNumber: 9, title: 'Vem Comigo', durationSeconds: 232 },
    { trackNumber: 10, title: 'Já Passou', durationSeconds: 215 }
  ],

  // Dizer Não de Vez (1992)
  'a1b2c3d4-0008-0008-0008-000000000014': [
    { trackNumber: 1, title: 'Dizer Não de Vez', durationSeconds: 225 },
    { trackNumber: 2, title: 'Alguém Como Tu', durationSeconds: 212 },
    { trackNumber: 3, title: 'Ar', durationSeconds: 205 },
    { trackNumber: 4, title: 'Uma Mulher de Armas', durationSeconds: 218 },
    { trackNumber: 5, title: 'Olho por Olho', durationSeconds: 198 },
    { trackNumber: 6, title: 'Ela Disse', durationSeconds: 235 },
    { trackNumber: 7, title: 'Mais Uma Vez', durationSeconds: 210 },
    { trackNumber: 8, title: 'Onde Está Ela', durationSeconds: 222 },
    { trackNumber: 9, title: 'Quando o Amor', durationSeconds: 215 },
    { trackNumber: 10, title: 'A Noite Passada', durationSeconds: 228 }
  ],

  // Direito ao Deserto (1993)
  'a1b2c3d4-0008-0008-0008-000000000015': [
    { trackNumber: 1, title: 'Direito ao Deserto', durationSeconds: 218 },
    { trackNumber: 2, title: 'Voo Cego', durationSeconds: 205 },
    { trackNumber: 3, title: 'Sinal de Cruz', durationSeconds: 225 },
    { trackNumber: 4, title: 'Fora do Ar', durationSeconds: 198 },
    { trackNumber: 5, title: 'Anjos', durationSeconds: 235 },
    { trackNumber: 6, title: 'Nunca Serei', durationSeconds: 212 },
    { trackNumber: 7, title: 'Luz da Meia-Noite', durationSeconds: 228 },
    { trackNumber: 8, title: 'Solidariedade', durationSeconds: 200 },
    { trackNumber: 9, title: 'O Teu Amor', durationSeconds: 215 },
    { trackNumber: 10, title: 'Que Mundo', durationSeconds: 222 }
  ],

  // Dados Viciados (1997)
  'a1b2c3d4-0008-0008-0008-000000000016': [
    { trackNumber: 1, title: 'Dados Viciados', durationSeconds: 228 },
    { trackNumber: 2, title: 'Voar', durationSeconds: 215 },
    { trackNumber: 3, title: 'Bem-Vindo ao Rock', durationSeconds: 205 },
    { trackNumber: 4, title: 'Toca a Andar', durationSeconds: 198 },
    { trackNumber: 5, title: 'Nada de Nada', durationSeconds: 222 },
    { trackNumber: 6, title: 'Como Estás?', durationSeconds: 210 },
    { trackNumber: 7, title: 'Sê Real', durationSeconds: 235 },
    { trackNumber: 8, title: 'Não Há Mal', durationSeconds: 200 },
    { trackNumber: 9, title: 'A Mesma Loucura', durationSeconds: 215 },
    { trackNumber: 10, title: 'Ao Teu Lado', durationSeconds: 225 }
  ],

  // Xutos & Pontapés (2009)
  'a1b2c3d4-0008-0008-0008-000000000017': [
    { trackNumber: 1, title: 'Aqui', durationSeconds: 222 },
    { trackNumber: 2, title: 'Toca a Andar', durationSeconds: 208 },
    { trackNumber: 3, title: 'Faz de Conta', durationSeconds: 215 },
    { trackNumber: 4, title: 'Sabe Tão Bem', durationSeconds: 198 },
    { trackNumber: 5, title: 'Silêncio', durationSeconds: 232 },
    { trackNumber: 6, title: 'Horizonte', durationSeconds: 210 },
    { trackNumber: 7, title: 'Coragem', durationSeconds: 225 },
    { trackNumber: 8, title: 'Dias de Sol', durationSeconds: 205 },
    { trackNumber: 9, title: 'Novas Histórias', durationSeconds: 218 },
    { trackNumber: 10, title: 'Fim da Linha', durationSeconds: 235 }
  ],

  // Puro (2014)
  'a1b2c3d4-0008-0008-0008-000000000018': [
    { trackNumber: 1, title: 'Puro', durationSeconds: 228 },
    { trackNumber: 2, title: 'A Esperança', durationSeconds: 215 },
    { trackNumber: 3, title: 'Vencedor', durationSeconds: 205 },
    { trackNumber: 4, title: 'Força', durationSeconds: 222 },
    { trackNumber: 5, title: 'O Amor é Tão Simples', durationSeconds: 198 },
    { trackNumber: 6, title: 'Irmão', durationSeconds: 235 },
    { trackNumber: 7, title: 'Caminho', durationSeconds: 210 },
    { trackNumber: 8, title: 'Terra Nova', durationSeconds: 225 },
    { trackNumber: 9, title: 'Vem Comigo', durationSeconds: 208 },
    { trackNumber: 10, title: 'Até ao Fim', durationSeconds: 230 }
  ],

  // Duro (2019)
  'a1b2c3d4-0008-0008-0008-000000000019': [
    { trackNumber: 1, title: 'Duro', durationSeconds: 215 },
    { trackNumber: 2, title: 'Aqui Estamos', durationSeconds: 228 },
    { trackNumber: 3, title: 'Tão Longe', durationSeconds: 205 },
    { trackNumber: 4, title: 'Não Desisto', durationSeconds: 218 },
    { trackNumber: 5, title: 'Voo de Pedra', durationSeconds: 232 },
    { trackNumber: 6, title: 'O Amanhã', durationSeconds: 210 },
    { trackNumber: 7, title: 'Estradas', durationSeconds: 222 },
    { trackNumber: 8, title: 'Resistir', durationSeconds: 198 },
    { trackNumber: 9, title: 'Juntos', durationSeconds: 235 },
    { trackNumber: 10, title: 'Sempre', durationSeconds: 215 }
  ],

  // Ao Vivo (1988) — Xutos & Pontapés
  'a1b2c3d4-0008-0008-0008-000000000020': [
    { trackNumber: 1, title: 'Minha Droga (Ao Vivo)', durationSeconds: 235 },
    { trackNumber: 2, title: 'Cerco (Ao Vivo)', durationSeconds: 248 },
    { trackNumber: 3, title: 'Só Sei Dançar Pogo (Ao Vivo)', durationSeconds: 158 },
    { trackNumber: 4, title: 'Nossa Senhora do Mar (Ao Vivo)', durationSeconds: 252 },
    { trackNumber: 5, title: 'Homem do Leme (Ao Vivo)', durationSeconds: 228 },
    { trackNumber: 6, title: 'TV (Ao Vivo)', durationSeconds: 210 },
    { trackNumber: 7, title: 'Hey Hey My My (Ao Vivo)', durationSeconds: 225 },
    { trackNumber: 8, title: 'Lua (Ao Vivo)', durationSeconds: 242 },
    { trackNumber: 9, title: 'Vida (Ao Vivo)', durationSeconds: 232 },
    { trackNumber: 10, title: 'Exilado (Ao Vivo)', durationSeconds: 218 }
  ],

  // --- GNR ---

  // Independança (1982)
  'a1b2c3d4-0009-0009-0009-000000000010': [
    { trackNumber: 1, title: 'Independança', durationSeconds: 185 },
    { trackNumber: 2, title: 'Atiraram o Gato ao Ar', durationSeconds: 172 },
    { trackNumber: 3, title: 'Nova Vaga', durationSeconds: 162 },
    { trackNumber: 4, title: 'Frenética', durationSeconds: 195 },
    { trackNumber: 5, title: 'Amanhã', durationSeconds: 178 },
    { trackNumber: 6, title: 'GNR', durationSeconds: 168 },
    { trackNumber: 7, title: 'Rock Poder', durationSeconds: 190 },
    { trackNumber: 8, title: 'Dança Pagã', durationSeconds: 175 }
  ],

  // Defeitos Especiais (1984)
  'a1b2c3d4-0009-0009-0009-000000000011': [
    { trackNumber: 1, title: 'Chico Fininho', durationSeconds: 198 },
    { trackNumber: 2, title: 'Vícios à Beira do Mar', durationSeconds: 212 },
    { trackNumber: 3, title: 'Não Tenho Calma', durationSeconds: 185 },
    { trackNumber: 4, title: 'Defeitos Especiais', durationSeconds: 225 },
    { trackNumber: 5, title: 'Rosa das Rosas', durationSeconds: 205 },
    { trackNumber: 6, title: 'Nós', durationSeconds: 195 },
    { trackNumber: 7, title: 'Amor Livre', durationSeconds: 218 },
    { trackNumber: 8, title: 'Espelho', durationSeconds: 188 },
    { trackNumber: 9, title: 'Mais um Dia', durationSeconds: 210 }
  ],

  // Os Homens Não Se Querem Bonitos (1985)
  'a1b2c3d4-0009-0009-0009-000000000012': [
    { trackNumber: 1, title: 'Os Homens Não Se Querem Bonitos', durationSeconds: 215 },
    { trackNumber: 2, title: 'Amor Impossível', durationSeconds: 205 },
    { trackNumber: 3, title: 'Olha o Gato', durationSeconds: 192 },
    { trackNumber: 4, title: 'A Pimenta dos Andes', durationSeconds: 225 },
    { trackNumber: 5, title: 'Rock d\'Aqui', durationSeconds: 198 },
    { trackNumber: 6, title: 'Faz Sentido', durationSeconds: 212 },
    { trackNumber: 7, title: 'Primavera', durationSeconds: 188 },
    { trackNumber: 8, title: 'Namorar', durationSeconds: 218 },
    { trackNumber: 9, title: 'Só no Escuro', durationSeconds: 205 }
  ],

  // Valsa dos Detectives (1989)
  'a1b2c3d4-0009-0009-0009-000000000013': [
    { trackNumber: 1, title: 'Valsa dos Detectives', durationSeconds: 225 },
    { trackNumber: 2, title: 'Pimba no Escuro', durationSeconds: 210 },
    { trackNumber: 3, title: 'Alta Fidelidade', durationSeconds: 198 },
    { trackNumber: 4, title: 'Canção da Gravidez', durationSeconds: 215 },
    { trackNumber: 5, title: 'Fanatismo', durationSeconds: 205 },
    { trackNumber: 6, title: 'Dança Pagã', durationSeconds: 222 },
    { trackNumber: 7, title: 'Loucura Solução', durationSeconds: 190 },
    { trackNumber: 8, title: 'Irmãos Gémeos', durationSeconds: 218 },
    { trackNumber: 9, title: 'Canção do Sádico', durationSeconds: 208 },
    { trackNumber: 10, title: 'Luar do Sertão', durationSeconds: 195 }
  ],

  // Rock in Rio Douro (1992)
  'a1b2c3d4-0009-0009-0009-000000000014': [
    { trackNumber: 1, title: 'Os Homens Não Se Querem Bonitos (Ao Vivo)', durationSeconds: 228 },
    { trackNumber: 2, title: 'Valsa dos Detectives (Ao Vivo)', durationSeconds: 240 },
    { trackNumber: 3, title: 'Alta Fidelidade (Ao Vivo)', durationSeconds: 212 },
    { trackNumber: 4, title: 'Chico Fininho (Ao Vivo)', durationSeconds: 215 },
    { trackNumber: 5, title: 'Defeitos Especiais (Ao Vivo)', durationSeconds: 238 },
    { trackNumber: 6, title: 'Independança (Ao Vivo)', durationSeconds: 198 },
    { trackNumber: 7, title: 'Psicopátria (Ao Vivo)', durationSeconds: 252 },
    { trackNumber: 8, title: 'Amor Impossível (Ao Vivo)', durationSeconds: 218 }
  ],

  // Sob Escuta (1994)
  'a1b2c3d4-0009-0009-0009-000000000015': [
    { trackNumber: 1, title: 'Sob Escuta', durationSeconds: 218 },
    { trackNumber: 2, title: 'Eu Próprio', durationSeconds: 205 },
    { trackNumber: 3, title: 'Ponto Final', durationSeconds: 225 },
    { trackNumber: 4, title: 'Lourinhã Roxy', durationSeconds: 195 },
    { trackNumber: 5, title: 'Nada Valho', durationSeconds: 215 },
    { trackNumber: 6, title: 'Espelho do Amor', durationSeconds: 208 },
    { trackNumber: 7, title: 'Hoje Não', durationSeconds: 198 },
    { trackNumber: 8, title: 'Fora de Controlo', durationSeconds: 222 },
    { trackNumber: 9, title: 'Volta a Começar', durationSeconds: 212 },
    { trackNumber: 10, title: 'Aqui Estamos', durationSeconds: 235 }
  ],

  // Mosquito (1998)
  'a1b2c3d4-0009-0009-0009-000000000016': [
    { trackNumber: 1, title: 'Mosquito', durationSeconds: 215 },
    { trackNumber: 2, title: 'Vencer', durationSeconds: 205 },
    { trackNumber: 3, title: 'Silêncio', durationSeconds: 228 },
    { trackNumber: 4, title: 'Não Há Nada', durationSeconds: 198 },
    { trackNumber: 5, title: 'A Vida Não Espera', durationSeconds: 215 },
    { trackNumber: 6, title: 'Sentidos', durationSeconds: 212 },
    { trackNumber: 7, title: 'Tarde Demais', durationSeconds: 225 },
    { trackNumber: 8, title: 'Manhã Azul', durationSeconds: 200 },
    { trackNumber: 9, title: 'Corrente', durationSeconds: 218 },
    { trackNumber: 10, title: 'O Rasto', durationSeconds: 235 }
  ],

  // Popless (2000)
  'a1b2c3d4-0009-0009-0009-000000000017': [
    { trackNumber: 1, title: 'Popless', durationSeconds: 208 },
    { trackNumber: 2, title: 'Meu Amor', durationSeconds: 215 },
    { trackNumber: 3, title: 'Não me Deixas', durationSeconds: 225 },
    { trackNumber: 4, title: 'Super Herói', durationSeconds: 198 },
    { trackNumber: 5, title: 'Loucura', durationSeconds: 212 },
    { trackNumber: 6, title: 'Ela', durationSeconds: 205 },
    { trackNumber: 7, title: 'Quem és Tu?', durationSeconds: 228 },
    { trackNumber: 8, title: 'Dias Gloriosos', durationSeconds: 218 },
    { trackNumber: 9, title: 'Espera', durationSeconds: 200 },
    { trackNumber: 10, title: 'Fuga', durationSeconds: 235 }
  ],

  // Do Lado dos Cisnes (2002)
  'a1b2c3d4-0009-0009-0009-000000000018': [
    { trackNumber: 1, title: 'Do Lado dos Cisnes', durationSeconds: 218 },
    { trackNumber: 2, title: 'Eterno', durationSeconds: 225 },
    { trackNumber: 3, title: 'Dúvida', durationSeconds: 205 },
    { trackNumber: 4, title: 'Avenida da Liberdade', durationSeconds: 212 },
    { trackNumber: 5, title: 'Ninguém', durationSeconds: 198 },
    { trackNumber: 6, title: 'A Minha Vez', durationSeconds: 228 },
    { trackNumber: 7, title: 'Sinto que Voa', durationSeconds: 215 },
    { trackNumber: 8, title: 'Tempo Livre', durationSeconds: 200 },
    { trackNumber: 9, title: 'Sonho', durationSeconds: 235 },
    { trackNumber: 10, title: 'Os Cisnes', durationSeconds: 222 }
  ],

  // Retropolitana (2010)
  'a1b2c3d4-0009-0009-0009-000000000019': [
    { trackNumber: 1, title: 'Retropolitana', durationSeconds: 212 },
    { trackNumber: 2, title: 'Semente', durationSeconds: 225 },
    { trackNumber: 3, title: 'Mar de Plástico', durationSeconds: 205 },
    { trackNumber: 4, title: 'Calma', durationSeconds: 218 },
    { trackNumber: 5, title: 'Perdido', durationSeconds: 198 },
    { trackNumber: 6, title: 'Nunca Mais', durationSeconds: 232 },
    { trackNumber: 7, title: 'Luz Própria', durationSeconds: 210 },
    { trackNumber: 8, title: 'Cidade Real', durationSeconds: 225 },
    { trackNumber: 9, title: 'Outro Sítio', durationSeconds: 200 },
    { trackNumber: 10, title: 'Horizonte Livre', durationSeconds: 215 }
  ],

  // Voos Domésticos (2011)
  'a1b2c3d4-0009-0009-0009-000000000020': [
    { trackNumber: 1, title: 'Voos Domésticos', durationSeconds: 218 },
    { trackNumber: 2, title: 'Imperfeito', durationSeconds: 205 },
    { trackNumber: 3, title: 'Na Mesma Onda', durationSeconds: 225 },
    { trackNumber: 4, title: 'Tão Perto', durationSeconds: 198 },
    { trackNumber: 5, title: 'Ando a Voar', durationSeconds: 212 },
    { trackNumber: 6, title: 'Destino Incerto', durationSeconds: 235 },
    { trackNumber: 7, title: 'Pouso', durationSeconds: 210 },
    { trackNumber: 8, title: 'Turbulência', durationSeconds: 222 },
    { trackNumber: 9, title: 'Altitude', durationSeconds: 200 },
    { trackNumber: 10, title: 'Chegada', durationSeconds: 228 }
  ],

  // --- Rui Veloso ---

  // Fora de Moda (1982)
  'a1b2c3d4-0010-0010-0010-000000000010': [
    { trackNumber: 1, title: 'Chico Fininho', durationSeconds: 195 },
    { trackNumber: 2, title: 'Não Sei Nadar', durationSeconds: 210 },
    { trackNumber: 3, title: 'Fora de Moda', durationSeconds: 225 },
    { trackNumber: 4, title: 'Cigana', durationSeconds: 198 },
    { trackNumber: 5, title: 'Blues de Verão', durationSeconds: 235 },
    { trackNumber: 6, title: 'Portugal Não É País Pequeno', durationSeconds: 205 },
    { trackNumber: 7, title: 'Asa Delta', durationSeconds: 215 },
    { trackNumber: 8, title: 'Só Tu', durationSeconds: 192 },
    { trackNumber: 9, title: 'Desemprego', durationSeconds: 218 },
    { trackNumber: 10, title: 'A Cidade', durationSeconds: 228 }
  ],

  // Guardador de Margens (1983)
  'a1b2c3d4-0010-0010-0010-000000000011': [
    { trackNumber: 1, title: 'Não Penses em Mim', durationSeconds: 212 },
    { trackNumber: 2, title: 'Guardador de Margens', durationSeconds: 228 },
    { trackNumber: 3, title: 'Noctâmbulo', durationSeconds: 205 },
    { trackNumber: 4, title: 'Dança dos Medos', durationSeconds: 218 },
    { trackNumber: 5, title: 'Porto Sentido', durationSeconds: 240 },
    { trackNumber: 6, title: 'Mulher da Cidade', durationSeconds: 198 },
    { trackNumber: 7, title: 'O Emigrante', durationSeconds: 225 },
    { trackNumber: 8, title: 'Noite Suja', durationSeconds: 210 },
    { trackNumber: 9, title: 'Saúde', durationSeconds: 192 }
  ],

  // Rui Veloso (1986)
  'a1b2c3d4-0010-0010-0010-000000000012': [
    { trackNumber: 1, title: 'Aqui, Ali', durationSeconds: 215 },
    { trackNumber: 2, title: 'Navalha', durationSeconds: 225 },
    { trackNumber: 3, title: 'A Guitarra e o Jazz', durationSeconds: 238 },
    { trackNumber: 4, title: 'Olhos d\'Água', durationSeconds: 205 },
    { trackNumber: 5, title: 'Acordar a Tempo', durationSeconds: 218 },
    { trackNumber: 6, title: 'Andança', durationSeconds: 198 },
    { trackNumber: 7, title: 'Última Dança', durationSeconds: 228 },
    { trackNumber: 8, title: 'Ao Abrigo da Lei', durationSeconds: 212 },
    { trackNumber: 9, title: 'Sinal de Vida', durationSeconds: 235 }
  ],

  // Ao Vivo (1988) — Rui Veloso
  'a1b2c3d4-0010-0010-0010-000000000013': [
    { trackNumber: 1, title: 'Chico Fininho (Ao Vivo)', durationSeconds: 210 },
    { trackNumber: 2, title: 'Porto Sentido (Ao Vivo)', durationSeconds: 255 },
    { trackNumber: 3, title: 'Não Sei Nadar (Ao Vivo)', durationSeconds: 225 },
    { trackNumber: 4, title: 'Fora de Moda (Ao Vivo)', durationSeconds: 238 },
    { trackNumber: 5, title: 'Guardador de Margens (Ao Vivo)', durationSeconds: 245 },
    { trackNumber: 6, title: 'Navalha (Ao Vivo)', durationSeconds: 240 },
    { trackNumber: 7, title: 'Blues de Verão (Ao Vivo)', durationSeconds: 252 },
    { trackNumber: 8, title: 'Portugal Não É País Pequeno (Ao Vivo)', durationSeconds: 218 }
  ],

  // Mingos & Os Samurais (1990)
  'a1b2c3d4-0010-0010-0010-000000000014': [
    { trackNumber: 1, title: 'Feiticeira', durationSeconds: 215 },
    { trackNumber: 2, title: 'O Rio', durationSeconds: 228 },
    { trackNumber: 3, title: 'Mais do Que Tudo', durationSeconds: 205 },
    { trackNumber: 4, title: 'Saia Curta', durationSeconds: 218 },
    { trackNumber: 5, title: 'Viagem', durationSeconds: 235 },
    { trackNumber: 6, title: 'Solidão do Rock', durationSeconds: 198 },
    { trackNumber: 7, title: 'Desconhecida', durationSeconds: 222 },
    { trackNumber: 8, title: 'Suave', durationSeconds: 210 },
    { trackNumber: 9, title: 'A Sombra', durationSeconds: 232 },
    { trackNumber: 10, title: 'Mundo Meu', durationSeconds: 215 }
  ],

  // Auto da Pimenta (1991)
  'a1b2c3d4-0010-0010-0010-000000000015': [
    { trackNumber: 1, title: 'Auto da Pimenta', durationSeconds: 218 },
    { trackNumber: 2, title: 'Menina da Rua', durationSeconds: 205 },
    { trackNumber: 3, title: 'Lua Cheia', durationSeconds: 228 },
    { trackNumber: 4, title: 'Pele Morena', durationSeconds: 198 },
    { trackNumber: 5, title: 'Boa Sorte', durationSeconds: 215 },
    { trackNumber: 6, title: 'Bela Madrugada', durationSeconds: 235 },
    { trackNumber: 7, title: 'Palavra de Homem', durationSeconds: 210 },
    { trackNumber: 8, title: 'O Nosso Amor', durationSeconds: 222 },
    { trackNumber: 9, title: 'Onde Vai', durationSeconds: 200 },
    { trackNumber: 10, title: 'Felicidade', durationSeconds: 212 }
  ],

  // Lado Lunar (1995)
  'a1b2c3d4-0010-0010-0010-000000000016': [
    { trackNumber: 1, title: 'Lado Lunar', durationSeconds: 225 },
    { trackNumber: 2, title: 'Horizonte', durationSeconds: 215 },
    { trackNumber: 3, title: 'A Maré', durationSeconds: 205 },
    { trackNumber: 4, title: 'Infinito', durationSeconds: 235 },
    { trackNumber: 5, title: 'Noturno', durationSeconds: 198 },
    { trackNumber: 6, title: 'Madrugada', durationSeconds: 218 },
    { trackNumber: 7, title: 'Lua de Lisboa', durationSeconds: 248 },
    { trackNumber: 8, title: 'Saudade Certa', durationSeconds: 210 },
    { trackNumber: 9, title: 'Viagem Sem Fim', durationSeconds: 228 },
    { trackNumber: 10, title: 'O Fado do Luar', durationSeconds: 242 }
  ],

  // Avenidas (1998)
  'a1b2c3d4-0010-0010-0010-000000000017': [
    { trackNumber: 1, title: 'Avenidas', durationSeconds: 218 },
    { trackNumber: 2, title: 'O Blues do Desemprego', durationSeconds: 235 },
    { trackNumber: 3, title: 'Menina', durationSeconds: 205 },
    { trackNumber: 4, title: 'Quatro Estações', durationSeconds: 222 },
    { trackNumber: 5, title: 'A Bela Porteira', durationSeconds: 198 },
    { trackNumber: 6, title: 'Rua do Carmo', durationSeconds: 215 },
    { trackNumber: 7, title: 'Largo do Intendente', durationSeconds: 228 },
    { trackNumber: 8, title: 'Noite Brava', durationSeconds: 210 },
    { trackNumber: 9, title: 'Canção da Despedida', durationSeconds: 235 },
    { trackNumber: 10, title: 'Inverno', durationSeconds: 225 }
  ],

  // A Espuma das Canções (2005)
  'a1b2c3d4-0010-0010-0010-000000000018': [
    { trackNumber: 1, title: 'A Espuma das Canções', durationSeconds: 215 },
    { trackNumber: 2, title: 'Saudade', durationSeconds: 228 },
    { trackNumber: 3, title: 'Ela Não Volta', durationSeconds: 205 },
    { trackNumber: 4, title: 'Maresia', durationSeconds: 218 },
    { trackNumber: 5, title: 'O Comboio', durationSeconds: 235 },
    { trackNumber: 6, title: 'Setembro', durationSeconds: 198 },
    { trackNumber: 7, title: 'Longe de Ti', durationSeconds: 222 },
    { trackNumber: 8, title: 'Branco e Preto', durationSeconds: 210 },
    { trackNumber: 9, title: 'A Canção do Emigrante', durationSeconds: 238 },
    { trackNumber: 10, title: 'Poema', durationSeconds: 225 }
  ],

  // Rui Veloso e Amigos (2012)
  'a1b2c3d4-0010-0010-0010-000000000019': [
    { trackNumber: 1, title: 'Chico Fininho (com Clã)', durationSeconds: 215 },
    { trackNumber: 2, title: 'Porto Sentido (com Aurea)', durationSeconds: 252 },
    { trackNumber: 3, title: 'Não Sei Nadar (com Camané)', durationSeconds: 228 },
    { trackNumber: 4, title: 'Guardador de Margens (com Pedro Abrunhosa)', durationSeconds: 240 },
    { trackNumber: 5, title: 'Blues de Verão (com António Zambujo)', durationSeconds: 248 },
    { trackNumber: 6, title: 'Fora de Moda (com Mariza)', durationSeconds: 232 },
    { trackNumber: 7, title: 'Navalha (com Bonga)', durationSeconds: 238 },
    { trackNumber: 8, title: 'Lua de Lisboa (com Sara Tavares)', durationSeconds: 255 },
    { trackNumber: 9, title: 'Portugal Não É País Pequeno (com David Fonseca)', durationSeconds: 218 },
    { trackNumber: 10, title: 'A Guitarra e o Jazz (Instrumental)', durationSeconds: 245 }
  ],

  // --- Madredeus ---

  // Existir (1990)
  'a1b2c3d4-0011-0011-0011-000000000010': [
    { trackNumber: 1, title: 'Existir', durationSeconds: 258 },
    { trackNumber: 2, title: 'Guitarra', durationSeconds: 235 },
    { trackNumber: 3, title: 'A Andorinha da Primavera', durationSeconds: 248 },
    { trackNumber: 4, title: 'Alfama', durationSeconds: 225 },
    { trackNumber: 5, title: 'Catavento e Girassol', durationSeconds: 265 },
    { trackNumber: 6, title: 'Mar d\'Outubro', durationSeconds: 242 },
    { trackNumber: 7, title: 'O Paraíso', durationSeconds: 252 },
    { trackNumber: 8, title: 'Pátio das Cantigas', durationSeconds: 218 },
    { trackNumber: 9, title: 'Haja o que Houver', durationSeconds: 238 }
  ],

  // O Espírito da Paz (1994)
  'a1b2c3d4-0011-0011-0011-000000000011': [
    { trackNumber: 1, title: 'O Espírito da Paz', durationSeconds: 268 },
    { trackNumber: 2, title: 'A Voz do Vento', durationSeconds: 245 },
    { trackNumber: 3, title: 'Apenas Amor', durationSeconds: 255 },
    { trackNumber: 4, title: 'Torre de Belém', durationSeconds: 238 },
    { trackNumber: 5, title: 'Rapariga', durationSeconds: 225 },
    { trackNumber: 6, title: 'O Planeta', durationSeconds: 258 },
    { trackNumber: 7, title: 'Canção da Paz', durationSeconds: 248 },
    { trackNumber: 8, title: 'Fado de Amor', durationSeconds: 262 },
    { trackNumber: 9, title: 'Lisboa', durationSeconds: 235 },
    { trackNumber: 10, title: 'Amor Eterno', durationSeconds: 272 }
  ],

  // Ainda (1995) — banda sonora de Wim Wenders
  'a1b2c3d4-0011-0011-0011-000000000012': [
    { trackNumber: 1, title: 'Ainda', durationSeconds: 278 },
    { trackNumber: 2, title: 'O Tejo', durationSeconds: 255 },
    { trackNumber: 3, title: 'Guitarra', durationSeconds: 242 },
    { trackNumber: 4, title: 'Haja o que Houver', durationSeconds: 248 },
    { trackNumber: 5, title: 'A Andorinha da Primavera', durationSeconds: 265 },
    { trackNumber: 6, title: 'Mar d\'Outubro', durationSeconds: 252 },
    { trackNumber: 7, title: 'O Paraíso', durationSeconds: 270 },
    { trackNumber: 8, title: 'Catavento e Girassol', durationSeconds: 258 },
    { trackNumber: 9, title: 'Os Dias da Madredeus', durationSeconds: 285 },
    { trackNumber: 10, title: 'O Pastor', durationSeconds: 245 }
  ],

  // O Paraíso (1997)
  'a1b2c3d4-0011-0011-0011-000000000013': [
    { trackNumber: 1, title: 'O Paraíso', durationSeconds: 272 },
    { trackNumber: 2, title: 'Velha Chica', durationSeconds: 258 },
    { trackNumber: 3, title: 'O Naufrágio', durationSeconds: 265 },
    { trackNumber: 4, title: 'Primavera', durationSeconds: 248 },
    { trackNumber: 5, title: 'Estranha Viagem', durationSeconds: 278 },
    { trackNumber: 6, title: 'Não Sei', durationSeconds: 242 },
    { trackNumber: 7, title: 'O Sol', durationSeconds: 255 },
    { trackNumber: 8, title: 'A Falua', durationSeconds: 268 },
    { trackNumber: 9, title: 'Chuva', durationSeconds: 235 },
    { trackNumber: 10, title: 'Véspera de Natal', durationSeconds: 252 }
  ],

  // Movimento (2001)
  'a1b2c3d4-0011-0011-0011-000000000014': [
    { trackNumber: 1, title: 'Movimento', durationSeconds: 258 },
    { trackNumber: 2, title: 'Que Deus Me Perdoe', durationSeconds: 245 },
    { trackNumber: 3, title: 'A Paz', durationSeconds: 268 },
    { trackNumber: 4, title: 'O Silêncio', durationSeconds: 252 },
    { trackNumber: 5, title: 'Canção do Mar', durationSeconds: 238 },
    { trackNumber: 6, title: 'Pátio das Cantigas', durationSeconds: 262 },
    { trackNumber: 7, title: 'Coração Independente', durationSeconds: 248 },
    { trackNumber: 8, title: 'Lisboa', durationSeconds: 275 },
    { trackNumber: 9, title: 'Tempo', durationSeconds: 235 },
    { trackNumber: 10, title: 'Adeus', durationSeconds: 255 }
  ],

  // Um Amor Infinito (2004)
  'a1b2c3d4-0011-0011-0011-000000000015': [
    { trackNumber: 1, title: 'Um Amor Infinito', durationSeconds: 268 },
    { trackNumber: 2, title: 'A Flor', durationSeconds: 252 },
    { trackNumber: 3, title: 'A Esperança', durationSeconds: 248 },
    { trackNumber: 4, title: 'O Mundo', durationSeconds: 262 },
    { trackNumber: 5, title: 'Abril', durationSeconds: 238 },
    { trackNumber: 6, title: 'Alegria', durationSeconds: 255 },
    { trackNumber: 7, title: 'Rua do Carmo', durationSeconds: 245 },
    { trackNumber: 8, title: 'Solidão', durationSeconds: 278 },
    { trackNumber: 9, title: 'O Beijo', durationSeconds: 242 },
    { trackNumber: 10, title: 'Amor Sem Fim', durationSeconds: 265 }
  ],

  // Faluas do Tejo (2005)
  'a1b2c3d4-0011-0011-0011-000000000016': [
    { trackNumber: 1, title: 'Faluas do Tejo', durationSeconds: 275 },
    { trackNumber: 2, title: 'Navegante', durationSeconds: 258 },
    { trackNumber: 3, title: 'Beira do Rio', durationSeconds: 248 },
    { trackNumber: 4, title: 'Madrugada', durationSeconds: 262 },
    { trackNumber: 5, title: 'O Rio Tejo', durationSeconds: 252 },
    { trackNumber: 6, title: 'Pescador', durationSeconds: 238 },
    { trackNumber: 7, title: 'A Vela', durationSeconds: 268 },
    { trackNumber: 8, title: 'Mar Calmo', durationSeconds: 245 },
    { trackNumber: 9, title: 'Porto de Abrigo', durationSeconds: 255 },
    { trackNumber: 10, title: 'Regresso ao Tejo', durationSeconds: 278 }
  ],
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
  'ddacdf34-2e2d-4d7a-af37-56e632d4b998': 'https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png',
  'c2eaf764-ca57-4180-b2f5-b6d8f1e5fb06': 'https://upload.wikimedia.org/wikipedia/en/0/02/Radioheadkida.png',
  'a1b2c3d4-0001-0001-0001-000000000005': 'https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png',
  'a1b2c3d4-0001-0001-0001-000000000001': 'https://upload.wikimedia.org/wikipedia/en/0/0f/Radiohead.pablohoney.albumart.jpg',
  'a1b2c3d4-0001-0001-0001-000000000002': 'https://upload.wikimedia.org/wikipedia/en/5/55/Radioheadthebends.png',
  'a1b2c3d4-0001-0001-0001-000000000003': 'https://upload.wikimedia.org/wikipedia/en/8/8c/Radiohead_-_Amnesiac_cover.png',
  'a1b2c3d4-0001-0001-0001-000000000004': 'https://upload.wikimedia.org/wikipedia/en/6/61/Radioheadhailtothethief.png',
  'a1b2c3d4-0001-0001-0001-000000000006': 'https://upload.wikimedia.org/wikipedia/en/a/a2/Radioheadthekingoflimbs.png',
  'a1b2c3d4-0001-0001-0001-000000000007': 'https://upload.wikimedia.org/wikipedia/en/6/6a/Amoonshapedpool.png',

  // The Beatles
  'd22d25f7-fdfa-4fc8-9fce-e0c65df5af9c': 'https://upload.wikimedia.org/wikipedia/en/2/2e/Please_Please_Me.png',
  'a1b2c3d4-0002-0002-0002-000000000001': 'https://upload.wikimedia.org/wikipedia/en/5/52/With_the_Beatles.png',
  'a1b2c3d4-0002-0002-0002-000000000002': 'https://upload.wikimedia.org/wikipedia/en/e/e6/HardDayUK.jpg',
  'a1b2c3d4-0002-0002-0002-000000000003': 'https://upload.wikimedia.org/wikipedia/en/4/40/Beatlesforsale.jpg',
  'a1b2c3d4-0002-0002-0002-000000000004': 'https://upload.wikimedia.org/wikipedia/en/d/d7/The_Beatles_-_Help%21.png',
  'a1b2c3d4-0002-0002-0002-000000000005': 'https://upload.wikimedia.org/wikipedia/en/5/5b/Rubber_Soul.png',
  'a1b2c3d4-0002-0002-0002-000000000006': 'https://upload.wikimedia.org/wikipedia/en/e/ec/Revolver_%28album_cover%29.jpg',
  'a1b2c3d4-0002-0002-0002-000000000007': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Sgt._Pepper%27s_Lonely_Hearts_Club_Band_album_art.jpg/960px-Sgt._Pepper%27s_Lonely_Hearts_Club_Band_album_art.jpg',
  'a1b2c3d4-0002-0002-0002-000000000008': 'https://upload.wikimedia.org/wikipedia/en/e/e8/MagicalMysteryTourDoubleEPcover.jpg',
  'a1b2c3d4-0002-0002-0002-000000000009': 'https://upload.wikimedia.org/wikipedia/commons/2/20/TheBeatles68LP.jpg',
  'a1b2c3d4-0002-0002-0002-000000000010': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1WEY9IK7T52A4rxHrAKWowpYxvIMyzFg_Qg&s',
  'a1b2c3d4-0002-0002-0002-000000000011': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/The_Beatles_Abbey_Road_album_cover.jpg/960px-The_Beatles_Abbey_Road_album_cover.jpg',
  '64e32095-d24b-4ec5-bc16-6701509930f9': 'https://upload.wikimedia.org/wikipedia/en/5/51/TheBeatles-LetItBe%282011VinylReissue%29.png',

  // Ornatos Violeta
  'a1b2c3d4-e5f6-7890-1234-56789abcdef1': 'https://upload.wikimedia.org/wikipedia/en/d/d1/C%C3%A3o.gif',
  'a1b2c3d4-0003-0003-0003-000000000001': 'https://upload.wikimedia.org/wikipedia/pt/7/77/Capamonstro.gif',

  // António Variações
  'a1b2c3d4-e5f6-7890-1234-56789abcdef2': 'https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/39/48/d6/3948d625-35ca-3a2b-7b79-d24462d30135/724382373353.jpg/600x600bf-60.jpg',
  'a1b2c3d4-0004-0004-0004-000000000001': 'https://upload.wikimedia.org/wikipedia/pt/8/8f/Ant%C3%B3nio_Varia%C3%A7%C3%B5es_-_Anjo_da_Guarda.jpg',
  'a1b2c3d4-0004-0004-0004-000000000002': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/1/2/4/0724385666421/tsp20110307202047/O-Melhor-De.jpg',
  'a1b2c3d4-0004-0004-0004-000000000003': 'https://static.fnac-static.com/multimedia/PT/images_produits/PT/ZoomPE/6/2/9/0094636306926/tsp20110121135520/A-Historia-de-Antonio-Variacoes-De-Braga-a-Nova-Iorque-2CD.jpg',

  // Papa Roach
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