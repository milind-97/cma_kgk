/* eslint-disable camelcase */
const post_model = require('../models/posts');
const slugify = require('slugify');
exports.create_post = async (req, res) => {
	const { title, content } = req.body;
	const slug = slugify(title, { lower: true });

	try {
		const post = await post_model.create({ title, slug, content });
		return res.status(200).json({ status: true, post });
	} catch (err) {
		console.log('==========', err, '========');
		// check if error from dabase validation
		if (err.name === 'SequelizeValidationError') {
			return res.status(200).json({
				status: false,
				message: err.errors[0].message,
			});
		} else if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(200).json({
				status: false,
				message: err.errors[0].message,
			});
		} else {
			console.log(err);
			return res.status(200).json({
				status: false,
				message: 'Something went wrong try after some time',
			});
		}
	}
};

exports.get_posts = async (req, res) => {
	const order_by = req.query.order_by ? req.query.order_by : 'id';
	const sort_order = req.query.sort_order ? req.query.sort_order : 'DESC';
	const page = req.query.page ? parseInt(req.query.page) : 1;
	const limit = req.query.limit ? parseInt(req.query.limit) : 10;
	const offset = (page - 1) * limit;
	try {
		const posts = await post_model.findAndCountAll({
			where: {},
			order: [[order_by, sort_order]],
			offset,
			limit,
		});
		return posts.count <= 0
			? res.status(200).json({
					status: false,
					message: 'Records Not Exists',
			  })
			: res.status(200).json({
					status: true,
					data: posts,
			  });
	} catch (err) {
		return res.status(200).json({
			status: 'false',
			message: 'Something Went Wrong',
			err: err.message,
		});
	}
};

exports.delete_post = async (req, res) => {
	try {
		const remove_post = await post_model.destroy({
			where: {
				id: req.params.id,
			},
		});

		return res.status(200).json({
			status: true,
			message: 'Post Removed Successfully!!!',
		});
	} catch (err) {
		if (transaction) await transaction.rollback();
		console.log(err);
		if (err.name === 'SequelizeValidationError') {
			return res.status(200).json({
				status: false,
				message: err.errors[0].message,
			});
		}
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(200).json({
				status: false,
				message: err.errors[0].message,
			});
		}
		return res.status(500).json({
			status: false,
			message: 'Something went wrong try after some time',
			err: err.message,
		});
	}
};

exports.update_post = async (req, res) => {
	try {
		const { title, content } = req.body;
		const post = await post_model.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!post)
			return res
				.status(200)
				.json({ status: false, message: 'Post not found' });
		post.title = title;
		post.slug = slugify(title, { lower: true });
		post.content = content;
		await post.save();
		return res.status(200).json({
			status: true,
			message: 'post Details Updated Successfully!!!',
		});
	} catch (err) {
		console.log(err);
		if (err.name === 'SequelizeValidationError') {
			return res.status(200).json({
				status: false,
				message: err.errors[0].message,
			});
		}
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(200).json({
				status: false,
				message: err.errors[0].message,
			});
		}
		return res.status(200).json({
			status: false,
			message: 'Something went wrong try after some time',
			err,
		});
	}
};

exports.get_post_id = async (req, res) => {
	try {
		const post = await post_model.findOne({
			where: { id: req.params.id },
		});
		if (!post) {
			return res.status(200).json({
				status: false,
				message: 'Records Not Exists',
			});
		}

		return res.status(200).json({
			status: true,
			data: post,
		});
	} catch (err) {
		return res.status(200).json({
			status: 'false',
			message: 'Something Went Wrong',
			err: err.message,
		});
	}
};
