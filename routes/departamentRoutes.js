const express = require("express");
const router = express.Router();

const {
  departamentId,
  readId,
  createDepartament,
  listDepartament,
  deleteDepartament,
  updateDepartament,
} = require("../controllers/departamentController");

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");

const { userById } = require("../controllers/userController");

//Routes

router.get(
  "/departament/:userId/:depId",
  requireSignin,
  isAuth,
  isAdmin,
  readId
);

router.get(
  "/departament/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  listDepartament
);

router.post(
  "/departament/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createDepartament
);

router.put(
  "/departament/:userId/:depId",
  requireSignin,
  isAuth,
  isAdmin,
  updateDepartament
);

router.delete(
  "/departament/:userId/:depId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteDepartament
);

//Parametros por defecto
//console.log(router.param("userId", userById));
router.param("depId", departamentId);
router.param("userId", userById);

module.exports = router;
