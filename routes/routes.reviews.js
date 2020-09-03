
const express = require("express");
const router = express.Router();
const { updateReviews } = require("../services/services.reviews");
const  multer= require('multer');
const upload = multer();

/**
 * Create or update a global setting
 */
router.put("/", upload.none(), async function (req, res) {
    console.log(req);
    const result = await updateReviews(req.body);
    res.status(result.status);
    res.json(result.message);
    }
);

module.exports = router;
