const express = require("express");
const app = express();

const userRouter = require("./router/user");
const adminRouter = require("./router/admin");
const ejs = require("ejs");

const db = require("./config/mongoose");
const session = require("express-session");
const logger = require("morgan");
const path = require("path");
const nocache = require("nocache");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000000 },
  })
);
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(nocache());

// app.use(express.static("public"))
app.use(logger("dev"));

app.use("/", userRouter);
app.use("/admin", adminRouter);

app.listen(3000, () => {
  console.log("server started");
});
db.dbConnection((res) => {
  if (res) {
    console.log("moongoose running");
  } else {
    console.log("err");
  }
});
