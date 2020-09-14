
/**
 * @module Routes/User 
 * @description
 * Provides routes for User resource
*/

// All modules
const express = require('express');
const router = express.Router();
const path = require('path');
const {createUser,getUser,login, 
    updateGlobalSetting, 
    getGlobalSetting,
    updateProfileSetting,
    getProfileSetting}= require('../services/services.users');
const {protectRoute} = require('../config/config.passport');
const multer = require('multer');
const {http} = require('../utilities/utilities');
const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({storage:storage});


/**
 * POST user create
*/
router.post('/',  upload.none(),async function(req, res){
    let result = await createUser(req.body);
    res.status(result.status);
    res.json(result.data._id);
})

/**
 * Login
*/
router.post('/login', upload.none(), async function(req, res){
    const {status, ...rest} = await login(req.body.username, req.body.password);
    res.status(status);
    console.log(rest);
    res.json(rest);
});

/**
 * Create or update a global setting
*/
router.put("/globalsettings", protectRoute, upload.single('logo'), async function(req, res){
    const result = await updateGlobalSetting(req.user.id, req.body, req.file);
    res.status(result.status);
    res.json(result.data);
})


/**
 * Get a global setting
*/
router.get("/globalsettings", protectRoute, async function (req, res){
    const result = await getGlobalSetting(req.user.id);
    res.status(result.status);
    res.json(result.data.globalsetting);
});

/**
 * Get a logo file
*/
router.get("/logo/:filename", protectRoute, function(req, res){
    //@todo error handling
    res.sendFile(path.join(__dirname, `../uploads/${req.params.filename}`));
});


/**
 * Create or update a profile setting
 */
router.put(
    "/profilesettings",
    protectRoute,
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "profileVideo", maxCount: 1 }
    ]),
    async function (req, res) {
        const result = await updateProfileSetting(req.user.id, req.body, req.files);
        res.status(result.status);
        if (result.status != http.ok) {
            res.json(result.message);
        }
        else{
            res.json(result.data);
        }
    }
);

/**
 * Get a profile setting
 */
router.get("/profilesettings", protectRoute,  async function (req, res) {
    const result = await getProfileSetting(req.user.id);
    if (result.status !== 200) {
        res.status(result.status);
        res.json(result.message);
    }
    res.status(result.status);
    res.json(result.data.profilesetting);
});

/**
 * Get profile image or video
 */
router.get("/profilesettings/media/:filename", protectRoute,  function (req, res) {
    /**
     * @todo error handling
    */
    res.sendFile(
        path.join(__dirname, `../uploads/${req.params.filename}`)
    );
});


module.exports = router;
