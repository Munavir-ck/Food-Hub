const db = require("../models/user");
const bcrypt = require("bcrypt");
const userDb = require("../models/user");
const productDb = require("../models/product");
const categoryDb = require("../models/category");

module.exports = {
  login: (req, res) => {
    res.render("user/login", { message: req.flash("message") });
  },
  signup: (req, res) => {
    res.render("user/signup");
  },
  home: async (req, res) => {
    try {
      if (req.session.loggedin) {
        let categories = await categoryDb.find();
        let product;
        const title = req.query.pro;
        const foodType = req.query.type;

        if (title) {
          const category = await categoryDb.findOne({ title: title });
          if (foodType) {
            product = await productDb.find({ foodtype: foodType });
          } else {
            product = await productDb.find({ category: title });
          }
          res.render("user/home", { product, categories, category: category });
        } else {
          product = await productDb.find();
          res.render("user/home", { product, categories, category: false });
        }
      } else {
        res.render("login", { message: false });
      }
    } catch (error) {
      console.log(error);
    }
  },
  postSignup: async (req, res) => {
    try {
      const user = await userDb.find({ email: req.body.useremail });

      if (user === true) {
        console.log("user", user);
        res.redirect("/signup");
      } else {
        console.log(req.body);

        const { username, useremail, password, confirmPassword } = req.body;

        if (password == confirmPassword) {
          let userpassword = await bcrypt.hash(password, 10);

          const user = await userDb.create({
            name: username,
            email: useremail,
            password: userpassword,
          });

          res.redirect("/");
        } else {
          res.render("signup", { message: "Password not matching" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userDb.findOne({ email: email });
      console.log(user);

      if (user) {
        bcrypt.compare(password, user.password, async (err, data) => {
          if (err) {
            console.log(err);
          } else if (data == !null) {
            req.session.isAuth = true;
            req.session.loggedin = true;
            req.session.login = user;
            let product = await productDb.find();
            let categories = await categoryDb.find();

            res.render("user/home", { product, categories, category: false });
          } else {
            req.flash("message", "Wrong Password");
            res.redirect("/");
          }
        });
      } else {
        req.flash("message", "Wrong Mail");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  },

  profile: (req, res) => {
    let user = req.session.login;
    res.render("user/profile", { user });
  },
  edit_profile: async (req, res) => {
   
    const { name, mail, id } = req.body;

    try {
      const result = await userDb.findOneAndUpdate(
        { _id: id },
        { $set: { email: mail, name: name } },
        { new: true }
      );

      console.log("Update successful:", result);

      res.json({ status: true });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  },

  userLogout: (req, res) => {
    req.session.destroy();
    res.redirect("/");
  },
};
