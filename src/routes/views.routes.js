const { Router } = require('express');
const { viewCounter } = require('../controllers/views.controller');
const isAuth = require('../middleware/isAuths');
const router = Router();

router.get('/posts/:id', isAuth, viewCounter);

module.exports = router;
