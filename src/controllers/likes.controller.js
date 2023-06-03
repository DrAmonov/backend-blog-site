const Io = require('../utils/Io');
const Like = require('../models/Likes');
const Likes = new Io('./db/likes.json');

const likes = async (req, res) => {
	const likes = await Likes.read();

	const user_id = req.user.id;
	const post_id = req.params.id;

	const findLike = likes.find(
		(like) => like.post_id == post_id && like.user_id == user_id
	);

	if (findLike) {
		const datalike = likes.filter(
			(like) => like.user_id !== user_id || like.post_id !== post_id
		);
		Likes.write(datalike);
		res.status(201).json({ message: 'UnLike' });
	} else {
		const newLike = new Like(post_id, user_id);
		const data = likes.length ? [...likes, newLike] : [newLike];
		Likes.write(data);
		res.status(201).json({ message: 'Like' });
	}
};

module.exports = {
	likes,
};
