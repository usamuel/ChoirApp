var  fs = require('fs');
var jwt = require('jsonwebtoken');

let authorizeRedirect = (req,res,next) =>{
    VerifyTokenPromise(req,res,next);
    
}

let ReadFilePromise = (req,filename) =>{
  
    return new Promise(function(resolve,reject){
  
      fs.readFile(`${req.Private_Public_Key_Path}/${filename}`,(err,file)=>{
        if(err){
          reject(err);
        }
        resolve(file);
    })
  
})}

let SignTokenPromise = (data,PrivateKey)=>{

    return new Promise((resolve,reject)=>{
  
      jwt.sign(data,PrivateKey,
        { algorithm: 'RS256',
        expiresIn:"10m"
     },
         function(err, token) {
            if(err){
              reject(err);
            }else{
            resolve(token);
          }
        })})}

let VerifyTokenPromise = (req,res,next)=>{
    ReadFilePromise(req,'public.key')
    .then( publicKey =>{
        _verifyToken(publicKey,req)
        .then( id =>{
            
            next();
        })
        .catch(err =>{
            res.render('server_error',{Errors:err});
        })
    })
    .catch(err=>{
        
        res.render('server_error',{Errors:err})
    })
}


let _verifyToken = (publicKey,req)=>{
    return new Promise((resolve,reject)=>{

        jwt.verify(req.params.token, publicKey, function(err, decoded) {
            if(err){
               switch(err.name){

                case 'TokenExpiredError':
                    let e1 = `Your Session Has Expired. Please <a class='error_link' 
                     href='http://localhost:3000/'>Login</a> `;
                  reject(e1);
                break;

                case 'JsonWebTokenError':
                    let e2 = `Unauthorized. Please <a class='error_link'
                     href='http://localhost:3000/'>Login</a>`;
                    reject(e2);
                break;

                default:
                    let e3 = `Acess Denied. Please <a class='error_link'
                     href='http://localhost:3000/'>Login</a>`
                    reject(e3);
               }

            }
            resolve(decoded.id);
           
            
          });

    })
}

module.exports.AuthorizeRedirect = authorizeRedirect;
module.exports.ReadFilePromise = ReadFilePromise;
module.exports.SignTokenPromise = SignTokenPromise