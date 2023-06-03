const { Router } = require('express');
const { profile } = require('../controllers/profil.controller');
const isAuth = require('../middleware/isAuths');

const router = Router();

router.post('/api/profile', isAuth, profile);

module.exports = router;
