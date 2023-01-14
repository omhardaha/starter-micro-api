const router = require("express").Router();
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// create post
router.post("/", async (req, res) => {
	try {
		const newPost = new Post(req.body);
		const user = await newPost.save();
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json(error);
	}
});
router.get("/length", async (req, res) => {
    // console.log("Sfds");
	try {
		let allPost = await Post.find();
		res.status(200).json({size:allPost.length});
	} catch (error) {
		res.status(500).json(error);
	}
});
//Update
router.put("/:id", async (req, res) => {
	try {
		const getPost = await Post.findById(req.params.id);
		if (getPost.username === req.body.username) {
			try {
				const updatedPost = await Post.findByIdAndUpdate(
					req.params.id,
					{ $set: req.body },
					{ new: true }
				);
				res.status(200).json(updatedPost);
			} catch (error) {
				res.status(500).json("m");
			}
		} else {
			res.status(500).json("you can update only your post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//deletePost
router.delete("/:id", async (req, res) => {
	try {
		const getPost = await Post.findById(req.params.id);
		if (getPost.username === req.body.username) {
			try {
				await getPost.delete();
				res.status(200).json("post has been deleted");
			} catch (error) {
				res.status(500).json("m");
			}
		} else {
			res.status(500).json("you can delete only your post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

//getPost
router.get("/:id", async (req, res) => {
	try {
		const getUser = await Post.findById(req.params.id);
		res.status(200).json(getUser);
	} catch (error) {
		res.status(500).json(error);
	}
});

//getAllPost
router.get("/", async (req, res) => {
	const username = req.query.username;
	const catName = req.query.cat;
	try {
		let allPost;
		if (username) {
			allPost = await Post.find({ username });
		} else if (catName) {
			allPost = await Post.find({ categories: { $in: [catName] } });
		} else {
			allPost = await Post.find();
		}
		res.status(200).json(allPost);
	} catch (error) {
		res.status(500).json(error);
	}
});
//post by page
router.get("/page/:number", async (req, res) => {
	const number = parseInt(req.params.number);
	console.log(number);
	try {
        let start = (number-1) * 10;
		let finish = start + 10;
		let allPost = await Post.find().limit(finish).skip(start).exec();
		res.status(200).json(allPost);
	} catch (error) {
		res.status(500).json(error);
	}
});


module.exports = router;
