// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();

// Your code here 
app.use(express.json());
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

// get all the artists
app.get("/artists", (req, res) => {
  const artists = getAllArtists();
  res.status(200).json(artists);
});

// add an artist
app.post("/artists", (req, res) => {
  const artistData = req.body;
  const newArtist = addArtist(artistData);
  res.status(201).json(newArtist);
})

// Get the latest artist added
app.get("/artists/latest", (req, res) => {
  const latest_artist = getLatestArtist();
  res.status(200).json(latest_artist);
})

// Get all albums of the latest artist
app.get("/artists/latest/albums", (req, res) => {
  const latest_artist_albums = getAlbumsForLatestArtist();
  res.status(200).json(latest_artist_albums);
})

// Get a specific artist's details based on artistId
app.get("/artists/:artistId", (req, res) => {
  const artistId = req.params.artistId;
  const artist = getArtistByArtistId(artistId);
  res.status(200).json(artist);
})

// #06 Edit a specified artist by artistId with PATCH
app.patch("/artists/:artistId", (req, res) => {
  const artistId = req.params.artistId;
  const data = req.body;
  const updated_artist = editArtistByArtistId(artistId, data);
  res.status(200).json(updated_artist);
})

// #06 Edit a specified artists by artistId with PUT
app.put("/artists/:artistId", (req, res) => {
  const artistId = req.params.artistId;
  const data = req.body;
  const updated_artist = editArtistByArtistId(artistId, data);
  res.status(200).json(updated_artist);
})

// #07 Delete a specified artist by artistId
app.delete("/artists/:artistId", (req, res) => {
  const artistId = req.params.artistId;
  deleteArtistByArtistId(artistId);
  
  res.status(200).json({"message": "Successfully deleted"});
});

// #08 Get all albums of a specific artist based on artistId
app.get("/artists/:artistId/albums", (req, res) => {
  const artistId = req.params.artistId;
  const albums = getAlbumsByArtistId(artistId);
  res.status(200).json(albums);
})

// #09 Get a specific album's details based on albumId
app.get("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  res.status(200).json(getAlbumByAlbumId(albumId));
})

// #10 Add an album to a specific artist based on artistId
app.post("/artists/:artistId/albums", (req, res) => {
  const artistId = req.params.artistId;
  const data = req.body;
  res.status(201).json(addAlbumByArtistId(artistId, data));
})

// #11 Edit a specified album by albumId
app.patch("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  const data = req.body;
  const updatedAlbum = editAlbumByAlbumId(albumId, data)
  res.status(200).json(updatedAlbum);
})

// #11 Edit a specified album by albumId
app.put("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  const data = req.body;
  const updatedAlbum = editAlbumByAlbumId(albumId, data)
  res.status(200).json(updatedAlbum);
})

// #12 Delete a specified album by albumId
app.delete("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  deleteAlbumByAlbumId(albumId)
  res.status(200).json({"message": "Successfully deleted"});
})

// #13 Get all albums with name filtered by first letter
app.get("/albums", (req, res) => {
  const startsWith = req.query.startsWith;
  const filteredAlbums = getFilteredAlbums(startsWith);
  res.status(200).json(filteredAlbums);
})

// #14 Get a specific song's detals based on songId
app.get("/songs/:songId", (req,res) => {
  const songId = req.params.songId;
  const song = getSongBySongId(songId);
  if (song) {
    res.status(200).json(song);
  } else {
    res.status(404).send("Song not found");
  }
})

// #15 Add a song to specific album based on albumId
app.post("/albums/:albumId/songs", (req, res) => {
  const albumId = req.params.albumId;
  const data = req.body;
  const updatedAlbum = addSongByAlbumId(albumId, data);

  if (updatedAlbum) {
    res.status(201).json(updatedAlbum);
  } else {
    res.status(404).send("Invalid song data")
  }
})

// #16 Get all songs of a spesific artist based on artistId
app.get("/artists/:artistId/songs", (req, res) => {
  const artistId = req.params.artistId;
  const songs = getSongsByArtistId(artistId);

  if (songs) {
    res.status(200).json(songs);
  } else {
    res.status(404).send("Artist not found")
  }
})

// #17 Get all songs of a specific album based on albumId
app.get("/albums/:albumId/songs", (req, res) => {
  const albumId = req.params.albumId;
  const songs = getSongsByAlbumId(albumId);

  if (songs) {
    res.status(200).json(songs);
  } else {
    req.status(404).send("Album not founs");
  }
})

// #18 Edit a specified song by songId with PATCH
app.patch("/songs/:songId", (req, res) => {
  const songId = req.params.songId;
  const data = req.body;
  const updatedSong =editSongBySongId(songId, data);

  if (updatedSong) {
    res.status(200).json(updatedSong);
  } else {
    res.status(404).send("Invalid song data");
  }
})

// #18 Edit a specified song by songId with PUT
app.put("/songs/:songId", (req, res) => {
  const songId = req.params.songId;
  const data = req.body;
  const updatedSong =editSongBySongId(songId, data);

  if (updatedSong) {
    res.status(200).json(updatedSong);
  } else {
    res.status(404).send("Invalid song data");
  }
})

// #19 Delete a specific song by songID
app.delete("/songs/:songId", (req, res) => {
  const songId = req.params.songId;
  const isDeleted = deleteSongBySongId(songId);

  res.status(200).json({"message": "Successfully deleted"});
 
})

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}