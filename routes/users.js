const router = require("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

// Update
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}
		try {
            console.log("trying ");
			const updateUser = await User.findByIdAndUpdate(
				req.params.id,
				{
					//  req.body
					$set:req.body
				},
				{ new: true }
			);
			res.status(200).json(updateUser);
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(401).json("You can only update your account");
	}
});
//Detele
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id) {
		try {
			const updateUser = await User.findByIdAndDelete(req.params.id);
			res.status(200).json("user deleted");
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(401).json("You can only update your account");
	}
});
//getUser
router.get("/:id", async (req, res) => {
	try {
		const getUser = await User.findById(req.params.id);
		const { password, ...other } = getUser._doc;
		res.status(200).json(other);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
