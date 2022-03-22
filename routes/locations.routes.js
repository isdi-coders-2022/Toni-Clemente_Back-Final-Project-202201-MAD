import express from 'express';
const router = express.Router();

import {
    getAllLocations,
    getLocation,
    insertLocation,
    updateLocation,
    deleteLocation,
} from '../controllers/locations.controller.js';

import { loginRequired, userRequired } from '../middlewares/interceptors.js';

/* GET users listing. */
// tendré que quitar el loginRequired del primer .get
router.get('/', getAllLocations);
router.get('/:id', getLocation);
router.post('/', loginRequired, insertLocation);
router.patch('/:id', loginRequired, userRequired, updateLocation);
router.delete('/:id', loginRequired, userRequired, deleteLocation);
//router.patch('/:id', updateLocation); //para que pueda actualizar un usuario no logado
//router.delete('/:id', deleteLocation); //para que pueda borrar un usuario no logado

export default router;

// module.exports = router;
