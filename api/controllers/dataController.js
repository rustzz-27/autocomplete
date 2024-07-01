const data = require('../model/data');

function search(query, type) {
  query = query.toLowerCase();
  const results = [];

  data.forEach(artist => {
    if (type === 'artist' && artist.name.toLowerCase().includes(query)) {
      results.push({
        type: 'artist',
        name: artist.name,
        albums: artist.albums
      });
    }

    artist.albums.forEach(album => {
      if (type === 'album' && album.title.toLowerCase().includes(query)) {
        results.push({
          type: 'album',
          artist: artist.name,
          title: album.title,
          songs: album.songs
        });
      }

      album.songs.forEach(song => {
        if (type === 'song' && song.title.toLowerCase().includes(query)) {
          results.push({
            type: 'song',
            artist: artist.name,
            album: album.title,
            title: song.title
          });
        }
      });
    });
  });

  return results;
}

exports.getData = (req, res) => {
  res.json(data);
};

exports.searchData = (req, res) => {
  const query = req.query.q;
  const type = req.query.type;
  if (!query || !type) {
    return res.status(400).json({ error: 'Query and type parameters are required' });
  }

  const results = search(query, type);
  res.json(results);
};
