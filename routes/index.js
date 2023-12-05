import { Router } from 'express';
import AppController from '../controllers/AppController';
import AppController from '../controllers/UsersController';

const router = Router();

router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStatus);

module.exports = router;
