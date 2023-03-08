const jwt = require("jsonwebtoken");
const sha256 = require("sha256");
const {
  LoginValidation,
  RegisterValidation,
} = require("../validation/AuthValidations");
const UsersDAO = require("../Models/userDAO");
const { ObjectId } = require("mongodb");

module.exports = class AuthControllers {
  static async Register(req, res) {
    try {
      const validRequest = RegisterValidation(req.body);
      if (!validRequest) {
        return res.status(400).json({
          sucess: false,
          message: "Please fill all fields",
        });
      }

      const userObject = req.body;

      const oldUser = await UsersDAO.getUserByEmail(userObject.email);

      if (oldUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exist",
        });
      }

      userObject.password = sha256(userObject.password);

      await UsersDAO.createUser(userObject);
      const token = jwt.sign(
        {
          user_id: userObject._id,
          userName: userObject.name,
          userEmail: userObject.email,
        },
        "secret"
      );

      console.log("mytoke", token);

      return res.json({ token: token });
    } catch (error) {
      res.status(500).json({ message: "something went wrong", sucess: false });
      console.log(err);
    }
  }

  // LOGIN CONTROLLER

  static async Login(req, res) {
    try {
      const validRequest = LoginValidation(req.body);
      if (!validRequest) {
        return res.status(400).json({
          sucess: false,
          message: "Please Fill all fields",
        });
      }

      const user = await UsersDAO.getUserByEmail(req.body.email);
      if (!user || user.password != sha256(req.body.password)) {
        return res.status(400).json({
          success: false,
          message: "Wrong username or password",
        });
      }
      const token = jwt.sign(
        {
          email: user.email,
          password: user.password,
          name: user.name,
        },
        "secret"
      );

      return res.json({
        auth: true,
        token: token,
        user: {
          _id: new ObjectId(user._id),
        },
      });
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Auth(req, res) {
    try {
      console.log("user authenticated");
      res.json(req.user);
    } catch (e) {
      console.log("error");
    }
  }
};
