const bcrypt = require('bcryptjs');

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);//this method returns bool value that is it same or not, first parameter is which password you want to compare , and 2nd is with which hash value you want to compare
};

module.exports = comparePassword;