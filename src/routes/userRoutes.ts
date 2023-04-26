import { Router } from 'express';
import UserController from '../controllers/userController';
import checkPermissions from '../middlewares/checkPermissions';

const router = Router();

router.get('/users',checkPermissions(['readUsers']), UserController.getUsers);
router.get('/secretUsers',checkPermissions(['createUsers']), UserController.getUsers);

router.post('/users', UserController.createUser);

export default router;