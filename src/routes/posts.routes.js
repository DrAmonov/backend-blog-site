const { Router } = require('express');
const {
	posts,
	postsEdite,
	postsDelete,
} = require('../controllers/posts.controller');
const isAuth = require('../middleware/isAuths');

const router = Router();

router.post('/posts', isAuth, posts);
router.put('/edite/:id', isAuth, postsEdite);
router.delete('/delete/:id', isAuth, postsDelete);

module.exports = router;
