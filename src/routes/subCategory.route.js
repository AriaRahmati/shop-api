const router = require('express').Router();

// Controllers
const SubCategoryController = require('@controllers/subCategory.controller');

// Middlewares
const checkUserAccess = require('@middlewares/checkUserAccess.middleware');

// Validators
const SubCategoryValidator = require('@validators/subCategory.validator');

router.get('/', SubCategoryController.getAll);
router.post('/', checkUserAccess, SubCategoryValidator.handle(), SubCategoryController.create);
router.get('/:id', SubCategoryController.get);
router.patch('/:id', checkUserAccess, SubCategoryValidator.handle(), SubCategoryController.update);
router.delete('/:id', checkUserAccess, SubCategoryController.remove);

module.exports = router;