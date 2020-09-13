
/**
 * @module Routes/User 
 * @description
 * Provides routes for User resource
*/

// All modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest:'./uploads/'});
const {createUser,getUser,login}= require('../services/services.users');
const {protectRoute} = require('../config/config.passport');

/* GET users listing. */
router.get('/:id', protectRoute,  async function(req, res) {
    let result = await getUser();
    res.status(result.status);
    res.send(result);
});

/**
 * POST user create
*/
router.post('/', protectRoute,  upload.none(),async function(req, res){
    let result = await createUser(req.body);
    res.status(result.status);
    res.json(result.data._id);
})

/**
 * Login
*/
router.post('/login', protectRoute, upload.none(), async function(req, res){
    const {status, ...rest} = await login(req.body.username, req.body.password);
    res.status(status);
    console.log(rest);
    res.json(rest);
});

module.exports = router;
