const bcrypt = require('bcryptjs');//this third party module provides hashing for password to make string password for security of user

//this function used for hashing of password which is asynchronous task//

const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (error, salt) => {
      if (error) {
        return reject(error);
      }

      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          return reject(error);
        }
        resolve(hash);
      });
    });
  });
};

module.exports = hashPassword;



// const hashPassword =  (password) =>{
//     return new Promise((resolve,object) => {
//            bcrypt.genSalt(12, (error, salt) => {
//             if(error){
//                 return reject(error);
//             }

//               bcrypt.hash(password, salt, (error, hash) => {
//                 if(error){
//                     reject(error);
//                 }

//                 resolve(hash);
//             })
//          })
//     })
// };

// module.exports= hashPassword;