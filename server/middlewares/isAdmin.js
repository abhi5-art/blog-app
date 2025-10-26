const isAdmin = (req, res, next) => {
     try{
       if (req.user && (req.user.role === 1 || req.user.role === 2)) {
         next();//allowed users as they are either admin or super-admin
       } else {
         res.code =401;
         throw new Error("Permission denied");
       }
     }catch(error){
        next(error);
     }
};

module.exports = isAdmin;