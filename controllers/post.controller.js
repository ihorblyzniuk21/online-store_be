const PostService = require('../services/post.service');

class PostController {
	async create(req, res) {
		try {
			const post = await PostService.create(req.body);
			return res.json(post);
		} catch (e) {
			console.log(e)
		}
	}

	async getAll(req, res) {
		try {
			const posts = await PostService.getAll()
			return res.json(posts)
		} catch (e) {
			console.log(e)
		}
	}

	async getOne(req, res) {
		try {
			const post = await PostService.getOne(req.params.id);
			return res.json(post);
		} catch (e) {
			console.log(e)
		}
	}

	async update(req, res) {
		try {
			const updatedPost = await PostService.update(req.body, req.params.id);
			return res.json(updatedPost);
		} catch (e) {
			console.log(e)
		}
	}

	async delete(req, res) {

	}
}

module.exports = new PostController();