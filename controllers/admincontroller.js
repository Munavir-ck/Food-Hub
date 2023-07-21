const { objectid, ObjectId } = require("mongodb");
const aminDb = require("../models/admin");
const userDb = require("../models/user");
const categoryDb = require("../models/category");
const productDb = require("../models/product");

const bcrypt = require("bcrypt");

const adminLogin = (req, res) => {
  res.render("admin/adminLogin");
};
const adminHome = (req, res) => {
  try {
    if (req.session.admin) {
      res.render("admin/userlist");
    } else {
      res.render("admin/adminLogin");
    }
  } catch (error) {
    console.log(error);
  }
};
const adminPostLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await aminDb.findOne({ email: email });

    if (admin) {
      bcrypt.compare(password, admin.password, async (err, data) => {
        if (err) {
          console.log(err);
        } else if (data == !null) {
          req.session.isAuth = true;
          req.session.loggedin = true;
          req.session.login = admin;

          const userdetails = await userDb.find({});

          console.log(userdetails);
          res.render("admin/userlist", { userdetails });
        } else {
          req.flash("message", "Wrong Password");
          res.redirect("/admin");
        }
      });
    } else {
      req.flash("message", "Wrong Mail");
      res.redirect("/admin");
    }
  } catch (error) {
    console.log(error);
  }
};

const make_admin = async (req, res) => {
  try {
    const user_id = req.params.id;

    console.log(user_id, 333333333);

    const user = await userDb.findById(user_id);

    const { name, email, password, access } = user;

    const admin = await aminDb.create({
      name,
      email,
      password,
      access,
    });
  } catch (error) {
    console.log(error);
  }
};

const product_list = async (req, res) => {
  try {
    const category = await categoryDb.find();
    const product = await productDb.find();

    res.render("admin/product_list", { category, product });
  } catch (error) {
    console.log(error);
  }
};

const add_category = async (req, res) => {
  try {
    const { title, description } = req.body;
    const category = await categoryDb.create({
      title,
      description,
    });

    res.redirect("/admin/product_list");
  } catch (error) {
    console.log(error);
  }
};

const add_foodtype = async (req, res) => {
  try {
    const category = await categoryDb.find();

  
    res.render("admin/add_foodtype", { category });
  } catch (error) {
    console.log(error);
  }
};

const post_add_foodtype = async (req, res) => {
  try {
    const { category, foodtype } = req.body;
    categoryDb
      .findById(category)
      .then((foundCategory) => {
        if (!foundCategory) {
          console.error("Category not found");
          return;
        }


        foundCategory.foodType.push({ title: foodtype });

        return foundCategory.save();
      })
      .then((updatedCategory) => {
        console.log("Category updated successfully:", updatedCategory);
      })
      .catch((err) => {
        console.error("Error updating category:", err);
      });

    res.redirect("/admin/add_foodtype");
  } catch (error) {
    console.log(error);
  }
};

const add_product = async (req, res) => {
  try {
    let image = req.files[0].path.substring(6);

    const { title, price, description, category, foodtype } = req.body;

    await productDb.create({
      image,
      title,
      price,
      description,
      category,
      foodtype,
    });
    res.redirect("/admin/product_list");
  } catch (error) {
    console.log(error);
  }
};

const get_edit_prdouct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productDb.findById(id);
    const category = await categoryDb.find();

    res.render("admin/edit_product", { product, category });
  } catch (error) {
    console.log(error);
  }
};

const edit_product = async (req, res) => {
  try {
    const { title, price, category, foodtype, description, id } = req.body;
    let image = req.files;

   

    if (image[0]) {
      let img = image[0].path.substring(6);

      const updatedProduct = await productDb.findOneAndUpdate(
        { _id: id },
        { title, price, category, foodtype, description, id, image: img }
      );
    } else {
      const updatedProduct = await productDb.findOneAndUpdate(
        { _id: id },
        { title, price, category, foodtype, description, id }
      );
    }

    res.json({ status: true });
  } catch (error) {
    console.log(error);
  }
};

const logoutadmin = (req, res) => {
  req.session.destroy();
  res.redirect("/admin");
};

module.exports = {
  adminLogin,
  adminPostLogin,
  adminHome,
  make_admin,
  product_list,
  add_category,
  add_foodtype,
  post_add_foodtype,
  add_product,
  get_edit_prdouct,
  edit_product,
  logoutadmin,
};
