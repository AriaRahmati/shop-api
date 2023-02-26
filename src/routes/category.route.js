const router = require('express').Router();

// Controllers
const CategoryController = require('@controllers/category.controller');

// Middlewares
const checkUserAccess = require('@middlewares/checkUserAccess.middleware');

// Validators
const CategoryValidator = require('@validators/category.validator');

router.get('/', CategoryController.getAll);
router.post('/', checkUserAccess, CategoryValidator.handle(), CategoryController.create);
router.get('/:id', CategoryController.get);
router.patch('/:id', checkUserAccess, CategoryValidator.handle(), CategoryController.update);
router.delete('/:id', checkUserAccess, CategoryController.remove);

module.exports = router;