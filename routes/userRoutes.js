const express= require('express')
const {registerUser, loginUser, createProduct, updateProduct, getAllProducts, deleteProduct,updateUserRole} = require("../controllers/userController");
const { isAuthenticatedUser, authorisedRole } = require('../middleware/Auth');

const router = express.Router();
//---- User routes 
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/fetch/product').get(getAllProducts);

//-----Admin Routes
router.route('/create/product').post(isAuthenticatedUser,authorisedRole('admin'),createProduct)
router.route('/update/product/:id').put(isAuthenticatedUser,authorisedRole('admin'),updateProduct)
router.route('/delete/product/:id').delete(isAuthenticatedUser,authorisedRole('admin'),deleteProduct)
router.route('/admin/user/:id').put(isAuthenticatedUser,authorisedRole('admin'), updateUserRole);

module.exports = router;