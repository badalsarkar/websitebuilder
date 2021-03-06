/**
 * @module Routes/Connect
*/

// All modules
const express = require("express");
const router = express.Router();
const {protectRoute} = require('../config/config.passport');
const {updateConnection, getConnection} = require("../services/services.connect");
const  multer= require('multer');
const upload = multer();

/**
 * Create or update a global setting
 */
router.put("/", protectRoute, upload.none(), async function (req, res) {
    const result = await updateConnection(req.body);
    res.status(result.status);
    res.json(result.message);
    }
);

/**
 * Get connection
*/
router.get("/:userid",protectRoute, async function (req, res){
    const result = await getConnection(req.params.userid);
    console.log(result.status);
    if(result.status !==200){
        res.status(result.status);
        res.json(result.message);
    }
    res.status(result.status);
    res.json(result.data);
});

module.exports = router;
