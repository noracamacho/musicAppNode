const { getAll, create, getOne, remove, update } = require('../controllers/albums.controlles');
const express = require('express');

const albumRouter = express.Router();

albumRouter.route('/')
    .get(getAll)
    .post(create);

albumRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = albumRouter;