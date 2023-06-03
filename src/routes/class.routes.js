const { Router } = require('express');
const { likes, disLikes } = require('../controllers/likes.controller');
const isAuth = require('../middleware/isAuths');

const router = Router();

router.post('/likes/:id', isAuth, likes);

module.exports = router;
