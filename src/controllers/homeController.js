import pool from "../configs/connectDB";
import multer from "multer";
import path from "path";

let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");

  return res.render("index.ejs", { dataUser: rows });
};

let getDetailpage = async (req, res) => {
  let userId = req.params.userId;
  let [user] = await pool.execute("select * from `users` where `id` = ?", [
    userId,
  ]);
  return res.send(JSON.stringify(user));
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "insert into users(firstName, lastName, email, address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  );
  return res.redirect("/");
};

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute("delete from users where id = ?", [userId]);
  return res.redirect(`/`);
};

let editUserpage = async (req, res) => {
  let id = req.params.userId;
  let [user] = await pool.execute("select * from users where id = ?", [id]);
  return res.render(`update.ejs`, { dataUser: user[0] });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "update users set firstName= ?, lastName= ?, email= ?, address=? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};

let getUploadFile = async (req, res) => {
  return res.render("uploadFile.ejs");
};

let handleUploadFile = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.file) {
    return res.send("please select !");
  }
  res.send(
    `image: <hr><img src='/image/${req.file.filename}' width='500'><hr><a href='/upload'>Upload another</a>`
  );
};

let uploadMultipleFile = async (req, res) => {
  console.log("ok");
  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  } else if (!req.files) {
    return res.send("please select !");
  }
  let result = "these images: <hr>";
  const files = req.files;
  let index, len;
  for (index = 0, len = files.length; index < len; ++index) {
    result += `<img src='/image/${req.files[index].filename}' width='300' style='margin-right:20px;'>`;
  }
  result += `<hr><a href='/upload'>Upload another</a>`;
  res.send(result);
};

module.exports = {
  getHomepage,
  getDetailpage,
  createNewUser,
  deleteUser,
  editUserpage,
  updateUser,
  getUploadFile,
  handleUploadFile,
  uploadMultipleFile,
};
