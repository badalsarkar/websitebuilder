
const express = require('express');
const router = express.Router();
const {updateProject}  = require('../services/services.project');
const multer = require('multer');
const upload = multer({dest:'./uploads/projects'});


/**
 * Create or update a global setting
*/
router.put("/", upload.single('image'), async function(req, res){
    const result = await updateProject(req.body, req.file);
    res.status(result.status);
    res.json(result.message);
})

module.exports=router;

