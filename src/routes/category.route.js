const router = require('express').Router();

// Controllers
const CategoryController = require('@controllers/category.controller');

// Middlewares
const CheckUserAccess = require('@middlewares/checkUserAccess.middleware');

// Validators
const CategoryValidator = require('@validators/category.validator');

router.get('/', CategoryController.getAll);
router.post('/', CheckUserAccess.handle, CategoryValidator.handle(), CategoryController.create);
router.get('/:id', CategoryController.get);
router.patch('/:id', CheckUserAccess.handle, CategoryValidator.handle(), CategoryController.update);
router.delete('/:id', CheckUserAccess.handle, CategoryController.remove);

module.exports = router;