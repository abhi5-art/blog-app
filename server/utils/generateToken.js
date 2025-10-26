const jwt = require('jsonwebtoken');//this third prty module used to generate web token for user, In short form this module known as JWT and token generated called as jwt token

const {jwtSecret} = require('../config/keys');

//jwt provides sign() method expects 3 parameters , 1st is object which you want to encrypt in token and 2nd is secret value . secret value is key to decrypt token , 3rd parameter is obj contain duration for which token remains valid
const generateToken = (user) => {
    const token = jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
     },
     jwtSecret,
      {
        expiresIn: "7d"
      }
    );

    return token;
};

module.exports = generateToken;