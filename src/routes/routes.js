const router = require('express').Router();
const apiRouter = require('express').Router();
const v1Router = require('express').Router();

// Routes
const docsRouter = require('@routes/docs.route');
const categoryRouter = require('@routes/category.route');
const subCategoryRouter = require('@routes/subCategory.route');
const productRouter = require('@routes/product.route');
const authRouter = require('@routes/auth.route');

// Middlewares

router.get('/', (req, res, next) => res.json({ name: 'shop', next: [{ name: 'api', route: '/api' }] }));
router.use('/api', apiRouter);

// api
apiRouter.get('/', (req, res, next) => res.json({ name: 'shop api', next: [{ name: 'v1', route: '/api/v1', inOperation: true }, { name: 'v2', route: '/api/v2', inOperation: false }] }));
apiRouter.use('/v1', v1Router);

// v1
v1Router.get('/', (req, res, next) => res.json({ name: 'shop api version 1.0', next: [{ name: 'documentation', route: '/api/v1/docs' }] }));
v1Router.use('/docs', docsRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/category', categoryRouter);
v1Router.use('/subCategory', subCategoryRouter);
v1Router.use('/product', productRouter);

module.exports = router;