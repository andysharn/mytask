const Users = require("../modals/userModel");
const Product = require("../modals/productModel");
const sendToken = require("../utils/jwtToken");

//-------- create user----------------------
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.create({
      name,
      email,
      password,
    });
    // res.json({
    //     sucess:true,
    //     status:200,
    //     User:user
    // })
    sendToken(user, 200, res);
  } catch (error) {
    res.json({
      sucess: false,
      status: 400,
      error: error,
    });
  }
};

//--------login  User ----------------------
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        sucess: false,
        status: 400,
        message: "please enter email or password",
      });
    }
    const user = await Users.findOne({
      email,
    }).select("+password");

    if (!user) {
      return res.json({
        sucess: false,
        status: 400,
        message: "user does not exist",
      });
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.json({
        sucess: false,
        status: 400,
        message: "user does not exist",
      });
    }
    // res.json({
    //     sucess:true,
    //     status:200,
    //     User:user
    // })
    sendToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

exports.updateUserRole = async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await Users.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
  });
};

exports.createProduct = async (req, res) => {
  try {
    console.log("hello");
    const product = await Product.create(req.body);
    res.status(201).json({
      sucsess: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    var product = await Product.findById(req.params.id);
    console.log("request", req.params.id);
    if (!product) {
      res.status(400).json({
        sucess: false,
        message: "product not found",
      });
    }
    console.log("request2 ", req.params.id);

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log("request 3", req.params.id);

    res.status(200).json({
      sucsess: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
    console.log("entered in hbhbh")
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(400).json({
        sucess: false,
        message: "product not found",
      });
    }
    console.log(product);

    console.log(product);

    res.status(200).json({
      sucsess: true,
      product,
    });

  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json({
      sucsess: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      error: error,
    });
  }
};
