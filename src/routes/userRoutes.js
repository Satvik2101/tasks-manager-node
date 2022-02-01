const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
      return cb(new Error("File must be jpg,png or jpeg."));
    }
    cb(undefined, true);
  },
});
router.get("/:id/avatar", userController.getUserImage);
router.get("/me", auth, (req, res) => {
  res.send(req.user);
});
router.post("/logout", auth, userController.logoutUser);
router.post("/logoutAll", auth, userController.logoutAllUsers);
router.post("/login", userController.loginUser);
router.post("/", userController.addUser);
router.patch("/me", auth, userController.updateUser);
router.delete("/me/avatar", auth, userController.deleteImage);
router.delete("/me", auth, userController.deleteUser);
router.post(
  "/me/avatar",
  auth,
  upload.single("upload"),
  userController.uploadImage,
  userController.uploadImageErrorHandler
);

module.exports = router;
