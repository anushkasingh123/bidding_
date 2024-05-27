const jwt = require('jsonwebtoken')
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  //const token = req.body.token;
  const auth= req.headers['authorization'];
  //console.log(auth);
  if(typeof auth !== 'undefined')
    {
      const bearer = auth.split(" ");
      const token=bearer[1];
      console.log(token);
      //req.token=token;
      jwt.verify(token, process.env.JWT_SECRET,(err,authData)=>{
        if(err){
          res.send({result:"invalid_token"})
        }
        else{
          req.user=authData;
          console.log(req.user);
          console.log("accessed");
          next();
        }
      })
    }
    else{
      res.send({
        message: "Token is required",
      })
    }
  }

const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.userinfo.role)) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports ={authenticateToken,authorizeRoles};