/**
 * @module Routes/Reviews
 *
*/

// All modules
const express = require("express");
const router = express.Router();
const { updateReviews, getReviews } = require("../services/services.reviews");
const  multer= require('multer');
const {protectRoute} = require("../config/config.passport");
const upload = multer();

/**
 * Create or update a global setting
 */
router.put("/", protectRoute,  upload.none(), async function (req, res) {
    const result = await updateReviews(req.body);
    res.status(result.status);
    res.json(result.message);
    }
);


/**
 * Get reviews of a user
*/
router.get("/:userid", protectRoute,  async function(req, res){
    const result = await getReviews(req.params.userid);
    if(result.status!==200){
        res.status(result.status);
        res.json(result.message);
    }
    res.status(result.status);
    res.json(result.data);
});

module.exports = router;
