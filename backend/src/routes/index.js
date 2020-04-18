import { Router } from 'express';
import multer from 'multer';

import multerConfig from '../config/multer';

import SessionController from '../app/controllers/SessionController';
import RecipientController from '../app/controllers/RecipientController';
import DeliverymanController from '../app/controllers/DeliverymanController';
import DeliveryController from '../app/controllers/DeliveryController';
import WithdrawDeliveryController from '../app/controllers/WithdrawDeliveryController';
import CompleteDeliveryController from '../app/controllers/CompleteDeliveryController';
import ProblemDeliveryController from '../app/controllers/ProblemDeliveryController';
import FileController from '../app/controllers/FileController';
import CancelDeliveryController from '../app/controllers/CancelDeliveryController';
import ProblemController from '../app/controllers/ProblemController';

import authMiddleware from '../app/middlewares/auth';
import bruteForce from '../lib/Brute';

import SessionStoreValidator from '../app/validators/SessionStore';
import DeliveryStoreValidator from '../app/validators/DeliveryStore';
import DeliveryUpdateValidator from '../app/validators/DeliveryUpdate';
import DeliverymanStoreValidator from '../app/validators/DeliverymanStore';
import DeliverymanUpdateValidator from '../app/validators/DeliverymanUpdate';
import ProblemDeliveryStoreValidator from '../app/validators/ProblemDeliveryStore';
import RecipientStoreValidator from '../app/validators/RecipientStore';
import RecipientUpdateValidator from '../app/validators/RecipientUpdate';

const router = new Router();

const updateFile = multer(multerConfig);

router.post(
  '/session',
  bruteForce.prevent,
  SessionStoreValidator,
  SessionController.store
);

router.get('/deliverymen/:id', DeliverymanController.show);
router.get('/deliverymen/:id/deliveries', WithdrawDeliveryController.index);
router.get('/deliveries/:id', DeliveryController.show);

router.put(
  '/deliveries/:id/deliveries/:deliverymanId/withdraw',
  WithdrawDeliveryController.update
);

router.put(
  '/deliveries/:id/complete',
  updateFile.single('file'),
  CompleteDeliveryController.update
);

router.get('/deliveries/:id/problems', ProblemDeliveryController.index);
router.post(
  '/deliveries/:id/problems',
  ProblemDeliveryStoreValidator,
  ProblemDeliveryController.store
);

router.use(authMiddleware);

router.get('/recipients', RecipientController.index);
router.get('/recipients/:id', RecipientController.show);
router.post('/recipients', RecipientStoreValidator, RecipientController.store);
router.put(
  '/recipients/:id',
  RecipientUpdateValidator,
  RecipientController.update
);
router.delete('/recipients/:id', RecipientController.delete);

router.get('/deliverymen', DeliverymanController.index);
router.post(
  '/deliverymen',
  DeliverymanStoreValidator,
  DeliverymanController.store
);
router.put(
  '/deliverymen/:id',
  DeliverymanUpdateValidator,
  DeliverymanController.update
);
router.delete('/deliverymen/:id', DeliverymanController.delete);

router.post('/files', updateFile.single('file'), FileController.store);

router.post('/deliveries', DeliveryStoreValidator, DeliveryController.store);
router.put(
  '/deliveries/:id',
  DeliveryUpdateValidator,
  DeliveryController.update
);
router.delete('/deliveries/:id', DeliveryController.delete);
router.get('/deliveries', DeliveryController.index);

router.get('/problems', ProblemController.index);
router.put('/problems/:id/cancel-delivery', CancelDeliveryController.update);

export default router;
