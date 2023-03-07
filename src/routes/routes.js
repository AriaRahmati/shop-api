const router = require('express').Router();
const v1Router = require('express').Router();

// Routes
const docsRouter = require('@routes/docs.route');
const categoryRouter = require('@routes/category.route');
const subCategoryRouter = require('@routes/subCategory.route');
const productRouter = require('@routes/product.route');
const authRouter = require('@routes/auth.route');

// Middlewares
const NotFound = require('@middlewares/notFound.middleware');
const ErrorHandler = require('@middlewares/errorHandler.middleware');

router.use('/api/v1', v1Router);
router.all('*', NotFound.handle);
router.use(ErrorHandler.handle);

// v1
v1Router.use('/docs', docsRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/category', categoryRouter);
v1Router.use('/subCategory', subCategoryRouter);
v1Router.use('/product', productRouter);

module.exports = router;