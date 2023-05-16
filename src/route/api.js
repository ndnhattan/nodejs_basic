import express from "express";
import APIController from "../controllers/APIController";

let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers);
  router.post("/create-user", APIController.createNewUser);
  router.post("/update-user", APIController.updateUser);
  router.post("/delete-user/:id", APIController.deleteUser);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
