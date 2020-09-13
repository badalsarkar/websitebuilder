/**
 * @module Routes/Project
*/

// All modules
const express = require('express');
const router = express.Router();
const {updateProject, getProject, deleteProject}  = require('../services/services.project');
const path = require('path');
const multer = require('multer');
const {protectRoute} = require('../config/config.passport');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads/projects"));
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname);
    }
});
const upload = multer({storage:storage});

/**
 * Create or update a global setting
*/
router.put("/", protectRoute,  upload.single('image'), async function(req, res){
    const result = await updateProject(req.body, req.file);
    res.status(result.status);
    res.json(result.message);
});

/**
 * Get all projects 
*/
router.get("/:userid", protectRoute,  async function(req, res){
   const result = await getProject(req.params.userid); 
    if(result.status!==200){
        res.status(result.status);
        res.json(result.message);
    }
    res.json(result.data);
});

/**
 * Get project images
*/
router.get("/media/:filename", protectRoute,  function(req, res){
    res.sendFile(path.join(__dirname, `../uploads/projects/${req.params.filename}`));
});


/**
 * Delete project
*/
router.delete("/", protectRoute,  async function(req, res){
    console.log(req.body);
    const result = await deleteProject(req.body.userId, req.body.projectId);
    res.status(result.status);
    res.json(result.message);
});

module.exports=router;

