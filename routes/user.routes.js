import express from 'express';
const router = express.Router();
//import { loginRequired, userRequired } from '../middlewares/interceptors.js';

import { insertUser, getAllUsers } from '../controllers/users.controller.js';

/* GET users listing. */

router.get('/', getAllUsers);
// router.get('/:id', getTask);
router.post('/', insertUser);
//debe ir antes el update de favorites porque si estuviera activado el de usuario podrían estorbarse.
//router.patch('/favourites/:id', loginRequired, userRequired, changeFavourites);
//router.patch('/:id', updateUser);
// router.delete('/:id', deleteTask);

export default router;

// module.exports = router;
