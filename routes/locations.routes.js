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
router.get('/', loginRequired, getAllLocations);
router.get('/:id', getLocation);
router.post('/', insertLocation);
router.patch('/:id', loginRequired, userRequired, updateLocation);
router.delete('/:id', loginRequired, userRequired, deleteLocation);

export default router;

// module.exports = router;
