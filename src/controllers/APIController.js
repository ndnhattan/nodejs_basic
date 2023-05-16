import pool from "../configs/connectDB";

let getAllUsers = async (req, res) => {
  const [rows] = await pool.execute("select * from users");
  return res.status(200).json({
    message: "ok",
    data: rows,
  });
};

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "insert into users(firstName, lastName, email, address) values (?, ?, ?, ?)",
    [firstName, lastName, email, address]
  );
  return res.status(200).json({
    message: "ok",
  });
};

let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "update users set firstName= ?, lastName= ?, email= ?, address=? where id = ?",
    [firstName, lastName, email, address, id]
  );
  return res.status(200).json({
    message: "ok",
  });
};

let deleteUser = async (req, res) => {};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
