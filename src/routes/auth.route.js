const router = require('express').Router();

// Controllers
const RegisterController = require('@controllers/auth/register.controller');
const LoginController = require('@controllers/auth/login.controller');

// Validators
const RegisterValidator = require('@validators/auth/register.validator');
const LoginValidator = require('@validators/auth/login.validator');

// Routes
router.post('/register', RegisterValidator.handle(), RegisterController.registerProcess);
router.post('/login', LoginValidator.handle(), LoginController.loginProcess);

module.exports = router;