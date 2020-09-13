var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({dest:'./uploads/'});
const {createUser,getUser,login}= require('../services/services.users');

/* GET users listing. */
router.get('/:id', async function(req, res) {
    let result = await getUser();
    res.status(result.status);
    res.send(result);
});

/**
 * POST user create
*/
router.post('/', upload.none(),async function(req, res){
    let result = await createUser(req.body);
    res.status(result.status);
    res.json(result.data._id);
})

/**
 * Login
*/
router.post('/login',upload.none(), async function(req, res){
    const {status, ...rest} = await login(req.body.username, req.body.password);
    res.status(status);
    console.log(rest);
    res.json(rest);
});

module.exports = router;
