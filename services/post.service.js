const { Post } = require('../models');

class PostService {
	async create(post) {
		const createdPost = await Post.create(post);
		return createdPost;
	}

	async getAll() {
		const posts = await Post.findAll();
		return posts;
	}

	async getOne(id) {
		const post = await Post.findOne(
			{ where: {id} }
		);
		return post;
	}

	async update(body, id) {
		const post = await Post.findOne(
			{ where: {id} }
		);
		const updatedPost = post.update(body);
		return updatedPost;
	}

	async delete() {

	}
}

module.exports = new PostService