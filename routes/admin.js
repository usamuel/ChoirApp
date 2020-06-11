var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
var {AuthorizeRedirect} = require('../middlewares/AAA')
var path = require('path');


/* GET users listing. */
router.get('/:token/:id',AuthorizeRedirect,(req, res)=> {
res.render('admin',{id:req.id});
});

module.exports = router;
