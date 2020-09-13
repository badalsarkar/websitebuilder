/**
 * @module Routes/Profile
 *
*/

// All modules
const express = require("express");
const router = express.Router();
const {
    updateProfileSetting,
    getProfileSetting
} = require("../services/services.profile");
const multer = require("multer");
const path = require('path');
const {protectRoute} = require("../config/config.passport");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/profilePicture/");
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

/**
 * Create or update a global setting
 */
router.put(
    "/",
    protectRoute,
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "profileVideo", maxCount: 1 }
    ]),
    async function (req, res) {
        const result = await updateProfileSetting(req.body, req.files);
        if (result.status != 200) {
            res.status(result.status);
            res.json(result.message);
        }
        res.status(result.status);
        res.json(result.data);
    }
);

/**
 * Get a profile setting
 */
router.get("/:id", protectRoute,  async function (req, res) {
    const result = await getProfileSetting(req.params.id);
    if (result.status !== 200) {
        res.status(result.status);
        res.json(result.message);
    }
    res.status(result.status);
    res.json(result.data);
});

/**
 * Get profile image or video
 */
router.get("/media/:filename", protectRoute,  function (req, res) {
    res.sendFile(
        path.join(__dirname, `../uploads/profilePicture/${req.params.filename}`)
    );
});

module.exports = router;
