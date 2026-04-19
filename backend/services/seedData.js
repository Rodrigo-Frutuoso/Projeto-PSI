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
  { mbid: 'ddacdf34-2e2d-4d7a-af37-56e632d4b998', title: 'OK Computer', releaseYear: 1997, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: 'c2eaf764-ca57-4180-b2f5-b6d8f1e5fb06', title: 'Kid A', releaseYear: 2000, albumType: 'LP', artistName: 'Radiohead' },
  { mbid: '488582ba-c69e-4eec-b530-5bfa2ab8f731', title: 'Creep', releaseYear: 1992, albumType: 'single', artistName: 'Radiohead' },
  { mbid: 'd22d25f7-fdfa-4fc8-9fce-e0c65df5af9c', title: 'Abbey Road', releaseYear: 1969, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: '64e32095-d24b-4ec5-bc16-6701509930f9', title: 'Let It Be', releaseYear: 1970, albumType: 'LP', artistName: 'The Beatles' },
  { mbid: '2bb5e8fc-f5b2-4d14-8742-1e9bf478635d', title: 'Infest', releaseYear: 2000, albumType: 'LP', artistName: 'Papa Roach' },

  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0101', title: 'Bacalhau à Portuguesa', releaseYear: 1992, albumType: 'single', artistName: 'Quim Barreiros' },
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0102', title: 'A Cabritinha', releaseYear: 1986, albumType: 'single', artistName: 'Quim Barreiros' },

  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0201', title: 'Com Que Voz', releaseYear: 1970, albumType: 'LP', artistName: 'Amália Rodrigues' },
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0202', title: 'Gaivota', releaseYear: 1955, albumType: 'single', artistName: 'Amália Rodrigues' },

  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0301', title: 'Circo de Feras', releaseYear: 1987, albumType: 'LP', artistName: 'Xutos & Pontapés' },
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0302', title: 'A Minha Casinha', releaseYear: 1987, albumType: 'single', artistName: 'Xutos & Pontapés' },

  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0401', title: 'Psicopátria', releaseYear: 1986, albumType: 'LP', artistName: 'GNR' },
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0402', title: 'Dunas', releaseYear: 1983, albumType: 'single', artistName: 'GNR' },

  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0501', title: 'Ar de Rock', releaseYear: 1980, albumType: 'LP', artistName: 'Rui Veloso' },
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0502', title: 'Chico Fininho', releaseYear: 1980, albumType: 'single', artistName: 'Rui Veloso' },

  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0601', title: 'Existir', releaseYear: 1990, albumType: 'LP', artistName: 'Madredeus' },
  { mbid: 'b09f0b4c-8e4c-4e4f-8d5a-4a935a1b0602', title: 'O Pastor', releaseYear: 1994, albumType: 'single', artistName: 'Madredeus' },

];

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
  const seedMbids = testAlbums.map((album) => album.mbid);
  const existingSeedAlbums = await Album.find({ mbid: { $in: seedMbids } }).select('mbid').lean();
  const existingSeedMbids = new Set(existingSeedAlbums.map((album) => album.mbid));
  const albumsToInsert = testAlbums.filter((album) => !existingSeedMbids.has(album.mbid));

  if (albumsToInsert.length > 0) {
    await Album.insertMany(albumsToInsert);
    insertedAlbums = albumsToInsert.length;
  }

  return {
    artistsCountBefore,
    albumsCountBefore,
    insertedArtists,
    insertedAlbums,
    alreadySeeded: insertedArtists === 0 && insertedAlbums === 0
  };
}

module.exports = { seedTestData };
