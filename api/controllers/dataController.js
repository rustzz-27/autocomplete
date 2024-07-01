// const data = require('../models/data');
const data = require('../model/data')

function search(query) {
  query = query.toLowerCase();
  const results = [];

  data.forEach(artist => {
    if (artist.name.toLowerCase().includes(query)) {
      results.push({
        type: 'artist',
        name: artist.name,
        albums: artist.albums
      });
    }

    artist.albums.forEach(album => {
      if (album.title.toLowerCase().includes(query)) {
        results.push({
          type: 'album',
          artist: artist.name,
          title: album.title,
          songs: album.songs
        });
      }

      album.songs.forEach(song => {
        if (song.title.toLowerCase().includes(query)) {
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
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const results = search(query);
  res.json(results);
};
