const router = require("express").Router();
const Categories = require("../models/Category");

// create categoru
router.post("/", async (req, res) => {
	try {
		const newCat = new Categories(req.body);
		const savedCat = await newCat.save();
		res.status(200).json(savedCat);
	} catch (error) {
		res.status(500).json(error);
	}
});
//get categoru
router.get("/", async (req, res) => {
	try {
		const cats = await Categories.find();
		res.status(200).json(cats);
	} catch (error) {
		res.status(500).json(error);
	}
});
module.exports = router;
