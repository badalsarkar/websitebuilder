const express = require("express");
const router = express.Router();
const { updateProfileSetting } = require("../services/services.profile");
const multer = require("multer");
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log(file.mimetype);
        cb(null, "./uploads/profilePicture/");
    }
});
const upload = multer({ storage: storage });

/**
 * Create or update a global setting
 */
router.put(
    "/",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "profileVideo", maxCount: 1 }
    ]),
    async function (req, res) {
        const result = await updateProfileSetting(req.body, req.files);
        res.status(result.status);
        res.json(result.message);
    }
);

module.exports = router;
