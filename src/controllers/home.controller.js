const Io = require('../utils/Io');
const Posts = new Io('./db/posts.json');

const home = async (req, res) => {
	const posts = await Posts.read();
	return posts;
};

module.exports = {
	home,
};
