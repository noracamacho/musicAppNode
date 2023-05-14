const Album = require("./Album");
const Artist = require("./Artist");
const Genre = require("./Genre");
const Song = require("./Song");

//Create relationships
// MM
Artist.belongsToMany(Genre, { through: "ArtistGenres" });
Genre.belongsToMany(Artist, { through: "ArtistGenres" });

// 1M
Album.belongsTo(Artist);
Artist.hasMany(Album);

// 1M
Song.belongsTo(Album);
Album.hasMany(Song);

// MM
Song.belongsToMany(Artist, { through: "SongsArtists"});
Artist.belongsToMany(Song, { through: "SongsArtists"});

// MM
Song.belongsToMany(Genre, { through: "SongsGenres" });
Genre.belongsToMany(Song, { through: "SongsGenres" });

