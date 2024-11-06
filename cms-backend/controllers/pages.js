/* eslint-disable camelcase */
const page_model = require('../models/pages');
const slugify = require('slugify');
exports.create_page = async (req, res) => {
	const { title, content } = req.body;
	const slug = slugify(title, { lower: true });

	try {
		const page = await page_model.create({ title, slug, content });
		return res.status(201).json({ status: true, page });
	} catch (err) {
		console.log('==========', err, '========');
		// check if error from dabase validation
		if (err.name === 'SequelizeValidationError') {
			return res.status(403).json({
				status: false,
				message: err.errors[0].message,
			});
		} else if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(403).json({
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

exports.get_page = async (req, res) => {
	const order_by = req.query.order_by ? req.query.order_by : 'id';
	const sort_order = req.query.sort_order ? req.query.sort_order : 'DESC';
	const page = req.query.page ? parseInt(req.query.page) : 1;
	const limit = req.query.limit ? parseInt(req.query.limit) : 10;
	const offset = (page - 1) * limit;
	try {
		const pages = await page_model.findAndCountAll({
			where: {},
			order: [[order_by, sort_order]],
			offset,
			limit,
		});
		return pages.count <= 0
			? res.status(404).json({
					status: false,
					message: 'Records Not Exists',
			  })
			: res.status(200).json({
					status: true,
					data: pages,
			  });
	} catch (err) {
		return res.status(500).json({
			status: 'false',
			message: 'Something Went Wrong',
			err: err.message,
		});
	}
};

exports.delete_page = async (req, res) => {
	try {
		const remove_page = await page_model.destroy({
			where: {
				id: req.params.id,
			},
		});

		return res.status(200).json({
			status: true,
			message: 'page Removed Successfully!!!',
		});
	} catch (err) {
		if (transaction) await transaction.rollback();
		console.log(err);
		if (err.name === 'SequelizeValidationError') {
			return res.status(403).json({
				status: false,
				message: err.errors[0].message,
			});
		}
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(403).json({
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

exports.update_page = async (req, res) => {
	try {
		const { title, content } = req.body;
		const page = await page_model.findOne({
			where: {
				id: req.params.id,
			},
		});
		if (!post)
			return res
				.status(404)
				.json({ status: false, message: 'Post not found' });
		page.title = title;
		page.slug = slugify(title, { lower: true });
		page.content = content;
		await post.save();
		return res.status(200).json({
			status: true,
			message: 'post Details Updated Successfully!!!',
		});
	} catch (err) {
		console.log(err);
		if (err.name === 'SequelizeValidationError') {
			return res.status(403).json({
				status: false,
				message: err.errors[0].message,
			});
		}
		if (err.name === 'SequelizeUniqueConstraintError') {
			return res.status(403).json({
				status: false,
				message: err.errors[0].message,
			});
		}
		return res.status(500).json({
			status: false,
			message: 'Something went wrong try after some time',
			err,
		});
	}
};
