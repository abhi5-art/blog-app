const express = require('express');
const router = express.Router();
const AllController = require('../controllers');
const { addCategoryValidator , idValidator} = require('../validators/category');
const Validate = require('../validators/validate');
const isAuth = require("../middlewares/isAuth");
const isAdmin = require('../middlewares/isAdmin');


router.post("/",
    isAuth,
    isAdmin,
    addCategoryValidator,
    Validate,
    AllController.categoryController.addCategory,
);

router.put(
    "/:id",
    isAuth,
    isAdmin,
    idValidator,
    Validate,
    AllController.categoryController.updateCategory
);

router.delete(
    "/:id",
    isAuth,
    isAdmin,
    idValidator,
    Validate,
    AllController.categoryController.deleteCategory,
  );

router.get("/", isAuth, AllController.categoryController.getCategories);

router.get(
    "/:id",
    isAuth,
    idValidator,
    Validate,
    AllController.categoryController.getCategory,
  );

module.exports = router;