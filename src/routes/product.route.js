const router = require('express').Router();
const upload = require('@src/uploadImages');

// Controllers
const ProductController = require('@controllers/product.controller');

// Middlewares
const fileToField = require('@middlewares/fileToField.middleware');
const checkUserAccess = require('@middlewares/checkUserAccess.middleware');

// Validators
const ProductValidator = require('@validators/product.validator');

router.get('/', ProductController.getAll);
router.post('/', checkUserAccess, upload.single('image'), fileToField.handle, ProductValidator.handle(), ProductController.create);
router.get('/:id', ProductController.get);
router.patch('/:id', checkUserAccess, upload.single('image'), fileToField.handle, ProductValidator.handle(), ProductController.update);
router.delete('/:id', checkUserAccess, ProductController.remove);

module.exports = router;