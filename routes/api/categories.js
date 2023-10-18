const express = require('express');

const ctrl = require('../../controllers/categories');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/category');

const router = express.Router();

// router.get('/', authenticate, ctrl.getAll);
router.get('/', ctrl.getAll);
// router.get('/:id', authenticate, isValidId, ctrl.getById);
router.get('/:id', isValidId, ctrl.getById);
// router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);
router.post('/', validateBody(schemas.addSchema), ctrl.add);
router.put(
  '/:id',
  // authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById,
);
// Soft deletion
router.patch(
  '/:id',
  // authenticate,
  isValidId,
  ctrl.deleteById,
);
router.patch(
  '/:id/rating',
  // authenticate,
  isValidId,
  validateBody(schemas.updateRatingSchema),
  ctrl.deleteById,
);

module.exports = router;
