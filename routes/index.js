var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bcrypt = require('bcrypt');
let {ReadFilePromise,SignTokenPromise} = require('../middlewares/AAA');



let SendToken = (doc,res,req)=>{

  ReadFilePromise(req,'private.key')
  .then( PrivateKey =>{
    let id= doc._id;

    SignTokenPromise({id:id},PrivateKey)
    .then(token =>{
      
    res.redirect(`http://localhost:3000/admin/${token}/${id}`)
  })
  .catch( jwt_error =>{
        
        res.render('server_error',{Errors:jwt_error});
  })
   
  })
  .catch( error => {
    
    
    res.render('server_error',{Errors:error});;
})}


/* GET home page. */
router.get('/', function(req, res) {

  res.render('login');
});


//login route
router.post('/',(req,res)=>{
  
    try{
  // //Load password hash from Users table
  User.findOne({email:req.body.email}).exec()
  .then((doc) =>{
    if(doc == null){
      res.json({error:true,type:'UI',detail:'Invalid Email/Password'});
    }
  // email exist check and compare passsword with bcrypt
      bcrypt.compare(req.body.password, doc.password).then(function(result) {
        if(result){
          // Login Successfull send userId and jwt token
         SendToken(doc,res,req);
        
        }else{
          
          res.json({error:true,type:'UI',detail:'Invalid Email/Password'});
        }
    });
  })
  .catch(err =>{
   res.render('server_error',{Errors:err}); //Possible bcrypt-related error 
  })
    }catch(e){
    // console.log(e);
   res.render('server_error',{Errors:e}); // POssible Syntax Error With Mongoose
    }
})

module.exports = router;
