const express = require('express');
const router = express.Router();
const {updateGlobalSetting}  = require('../services/services.globalsetting');
const multer = require('multer');
const upload = multer({dest:'./uploads/logo'});


/**
 * Create or update a global setting
*/
router.put("/", upload.single('logo'), async function(req, res){
    console.log(req.file);
    const result = await updateGlobalSetting(req.body, req.file);
    res.status(result.status);
    res.json(result.message);
})

module.exports=router;

