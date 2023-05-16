import express from "express";
import homeController from "../controllers/homeController";
import multer from "multer";
import path from "path";
var appRoot = require("app-root-path");
let router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appRoot + "/src/public/image/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG)$/)) {
    req.fileValidationError = "not allowed";
    return cb(new Error("not allowed"), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);
  router.get("/detail/user/:userId", homeController.getDetailpage);
  router.post("/create-new-user", homeController.createNewUser);
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:userId", homeController.editUserpage);
  router.post("/update-user", homeController.updateUser);
  router.get("/upload", homeController.getUploadFile);
  router.post(
    "/upload-profile-pic",
    upload.single("profile-pic"),
    homeController.handleUploadFile
  );
  router.post(
    "/upload-multiple-images",
    upload.array("multiple-images", 3),
    homeController.uploadMultipleFile
  );

  router.get("/about", (req, res) => {
    res.send("hi mf***");
  });

  return app.use("/", router);
};

module.exports = initWebRoute;
