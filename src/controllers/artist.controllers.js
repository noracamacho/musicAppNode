const catchError = require('../utils/catchError');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

const getAll = catchError(async(req, res) => {
    const results = await Artist.findAll({ include: [Genre]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Artist.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Artist.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Artist.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Artist.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

// Relaciones muchos a muchos
// Se usa set en lugar de add ya que set sustituye los datos que estaban anteriormente, 
// caso contrario del add, el add agrega datos a los datos existentes
// Instertar los cursos de un estudiante
const setArtistGenres = catchError(async(req, res) => {
    //  1. Search artist by Id
    const { id } = req.params;
    const artist = await Artist.findByPk(id);
    //  2. Set artist's genres
    await artist.setGenres(req.body);
    // 3. Call and return genres
    const genres = await artist.getGenres()
    return res.json(genres);
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setArtistGenres
}