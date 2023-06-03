const Io = require('../utils/Io');
const Users = new Io('./db/users.json');
const Posts = new Io('./db/posts.json');
const Post = require('../models/Post');
const { v4: uuid } = require('uuid');

const posts = async (req, res) => {
	try {
		const users = await Users.read();
		const posts = await Posts.read();
		const { title, description } = req.body;
		const { img } = req.files;
		const { id } = req.user;
		const findUser = users.find((user) => user.id === id);
		if (findUser) {
			const post_id = uuid();
			const user_id = findUser.id;
			const newImgName = ` ${uuid()}.${img.mimetype.split('/')[1]}`;
			img.mv(`${process.cwd()}/uploads/${newImgName}`);
			const viewCounts = 0;
			const newPost = new Post(
				post_id,
				user_id,
				newImgName,
				title,
				description,
				viewCounts
			);
			const data = posts ? [...posts, newPost] : [newPost];
			Posts.write(data);
			res.status(201).json({ message: 'success' });
		} else {
			res.status(403).json({ message: ' not found' });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const postsEdite = async (req, res) => {
	const posts = await Posts.read();
	const { title, description } = req.body;
	const { img } = req.files;

	const userId = req.user.id;
	const postId = req.url.split('/')[4];

	const findUser = posts.find((user) => user.user_id == userId);
	const findPost = posts.find((post) => post.post_id == postId);

	if (!findPost || !findUser) {
		res.status(404).json({
			message: "Post's id is undefined or This post is not owned by you",
		});
	} else {
		findPost.title = title;
		findPost.description = description;

		if (img) {
			const newImgName = ` ${uuid()}.${img.mimetype.split('/')[1]}`;
			img.mv(`${process.cwd()}/uploads/${newImgName}`);
			findPost.img = newImgName;
		} else {
			findPost.img = findPost.img;
		}
		Posts.write(posts);
		res.status(201).json({ message: 'Succsess!' });
	}
};

const postsDelete = async (req, res) => {
	const posts = await Posts.read();

	const userId = req.user.id;
	const postId = req.url.split('/')[4];

	const findUser = posts.find((user) => user.user_id == userId);
	const findPost = posts.find((post) => post.post_id == postId);

	if (!findPost || !findUser) {
		res.status(404).json({
			message: "Not your post",
		});
	} else {
		const filtredPosts = await posts.filter((post) => post.post_id !== postId);
		Posts.write(filtredPosts);
		res.status(201).json({ message: 'Succsessfully deleted!' });
	}
};

module.exports = {
	posts,
	postsEdite,
	postsDelete,
};
