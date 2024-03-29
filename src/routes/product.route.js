const router = require('express').Router();
const UploadImage = require('@middlewares/uploadImages.middleware');

// Controllers
const ProductController = require('@controllers/product.controller');

// Middlewares
const fileToField = require('@middlewares/fileToField.middleware');
const CheckUserAccess = require('@middlewares/checkUserAccess.middleware');

// Validators
const ProductValidator = require('@validators/product.validator');

const upload = UploadImage.get();

router.get('/', ProductController.getAll);
router.post('/', CheckUserAccess.handle, upload.single('image'), fileToField.handle, ProductValidator.handle(), ProductController.create);
router.get('/:id', ProductController.get);
router.patch('/:id', CheckUserAccess.handle, upload.single('image'), fileToField.handle, ProductValidator.handle(), ProductController.update);
router.delete('/:id', CheckUserAccess.handle, ProductController.remove);

module.exports = router;