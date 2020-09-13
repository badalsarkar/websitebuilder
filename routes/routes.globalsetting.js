/**
 * @module Routes/GlobalSetting
*/

// All modules
const express = require('express');
const router = express.Router();
const {updateGlobalSetting, getGlobalSetting}  = require('../services/services.globalsetting');
const path = require('path');
const {protectRoute} = require('../config/config.passport');
const multer = require('multer');
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/logo');
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, file.originalname);
    }
});
const upload = multer({storage:storage});

/**
 * Create or update a global setting
*/
router.put("/", protectRoute, upload.single('logo'), async function(req, res){
    const result = await updateGlobalSetting(req.body, req.file);
    res.status(result.status);
    res.json(result.data);
})

/**
 * Get a global setting
*/
router.get("/:id", protectRoute, async function (req, res){
    const result = await getGlobalSetting(req.params.id);
    res.status(result.status);
    res.json(result.data);
});

/**
 * Get a logo file
*/
router.get("/logo/:filename", protectRoute, function(req, res){
    res.sendFile(path.join(__dirname, `../uploads/logo/${req.params.filename}`));
});

module.exports=router;

