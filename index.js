const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();
app.use(express.json());
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postRoute = require("./routes/post");
const topRoute = require("./routes/top");
const categoryRoute = require("./routes/category");

app.use("/images", express.static(path.join(__dirname + "/images")));

mongoose
    .connect("mongodb+srv://omhardahamern:IWjxI9GKYcGtncjd@cluster0.tzwc2.mongodb.net/Node-React-blog?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("MongoDB Connected"))
    .catch((err) => {
        console.log("Falied To Connect", err);
    });

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "images");
// 	},
// 	filename: (req, file, cb) => {
// 		cb(null,req.body.name );
// 	},
// });

const upload = multer({ dest: "images/" });

// app.post("/upload", upload.single("file"), (req, res) => {
// 	res.status(200).json("File has been uploaded");
// });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const fileType = req.file.mimetype.split("/")[1];
    const compleFileName = req.file.filename + "." + fileType;
    console.log(req.file);
    console.log(compleFileName);
    fs.rename(
        "images/" + req.file.filename,
        "images/" + compleFileName,
        (err) => {
            if (err) {
                console.log(err);
            }
        }
    );
    res.status(200).json(compleFileName);
});

app.use("/api/auth", authRoute);
app.use("/api/top", topRoute);
app.use("/api/users", usersRoute);
app.use("/api/post", postRoute);
app.use("/api/category", categoryRoute);

app.listen(process.env.PORT ||5000, () => {
    console.log("server is Running 5000");
});
