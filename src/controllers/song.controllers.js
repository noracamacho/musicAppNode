const catchError = require('../utils/catchError');
const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Song.findAll({ include: [Artist, Genre]});

    // const results = await Song.findAll({ include: [
    //     // Album
    //     {
    //         model: Album,
    //         attributes: ['name']
    //     }
    // ]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Song.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Song.findByPk(id, { include: [Artist]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Song.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Song.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// Relaciones muchos a muchos
// Se usa set en lugar de add ya que set sustituye los datos que estaban anteriormente, 
// caso contrario del add, el add agrega datos a los datos existentes
// Instertar los artistas de una cancion
const setSongArtists = catchError(async(req, res) => {
    //  1. Search artist by Id
    const { id } = req.params;
    const song = await Song.findByPk(id);
    //  2. Set song's artists
    await song.setArtists(req.body);
    // 3. Call and return artists
    const artists = await song.getArtists();
    return res.json(artists);
});

const setSongGenres = catchError(async(req, res) => {
    //  1. Search artist by Id
    const { id } = req.params;
    const song = await Song.findByPk(id);
    //  2. Set song's genres
    await song.setGenres(req.body);
    // 3. Call and return genres
    const genres = await song.getGenres();
    return res.json(genres);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update, 
    setSongArtists,
    setSongGenres
}