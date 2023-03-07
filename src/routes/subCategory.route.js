const router = require('express').Router();

// Controllers
const SubCategoryController = require('@controllers/subCategory.controller');

// Middlewares
const CheckUserAccess = require('@middlewares/checkUserAccess.middleware');

// Validators
const SubCategoryValidator = require('@validators/subCategory.validator');

router.get('/', SubCategoryController.getAll);
router.post('/', CheckUserAccess.handle, SubCategoryValidator.handle(), SubCategoryController.create);
router.get('/:id', SubCategoryController.get);
router.patch('/:id', CheckUserAccess.handle, SubCategoryValidator.handle(), SubCategoryController.update);
router.delete('/:id', CheckUserAccess.handle, SubCategoryController.remove);

module.exports = router;