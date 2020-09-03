

const express = require("express");
const router = express.Router();
const {updateConnection} = require("../services/services.connect");
const  multer= require('multer');
const upload = multer();

/**
 * Create or update a global setting
 */
router.put("/", upload.none(), async function (req, res) {
    const result = await updateConnection(req.body);
    res.status(result.status);
    res.json(result.message);
    }
);

module.exports = router;
