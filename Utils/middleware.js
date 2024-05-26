const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  //const token = req.body.token;
  const token= req.header('token');
//const {token} = authHeader && authHeader.split(' ')[1];
//authHeader && authHeader.split(' ')[1];
console.log(token);
  if (token == null) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
      req.userId=decoded.userId;
      next();
    })
    //console.log(data);
    //res.send(data);

  } catch (error) {
    return res.send({
      data:error,
      message: "Not Authenticated, login again",
    }
      
    )
  }

    next();
  }

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports ={authenticateToken,authorizeRoles};