const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const compression = require("compression")

const itemRoutes = require("./routes/items");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      "/" +
        new Date().toISOString().replace(/:/g, "-") +
        "-" +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json()); 
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/items", itemRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
  app.use(compression())
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    } 
  });
});
 
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => {
    app.listen(PORT, console.log(`Server is running at port ${PORT}`));
  })
  .catch((err) => console.log(err));
