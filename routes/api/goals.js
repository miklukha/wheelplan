const express = require('express');

const ctrl = require('../../controllers/goals');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/goal');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);
router.get('/:id', authenticate, isValidId, ctrl.getById);
router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);
router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById,
);
// Soft deletion
router.patch('/:id', authenticate, isValidId, ctrl.deleteById);
router.patch(
  '/:id/status',
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusSchema),
  ctrl.updateStatus,
);
router.patch(
  '/:id/progress',
  authenticate,
  isValidId,
  validateBody(schemas.updateProgressSchema),
  ctrl.updateProgress,
);
router.get(
  '/category/:categoryId',
  authenticate,
  isValidId,
  ctrl.getAllByCategory,
);

module.exports = router;
