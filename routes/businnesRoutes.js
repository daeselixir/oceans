const express = require("express");
const router = express.Router();

const {
  createBusiness,
  listBusiness,
  deleteBusiness,
  updateBusiness,
  businessId,
  readBusinessId,
  update
} = require("../controllers/businessController");

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");

const {
  userById
} = require("../controllers/userController");

//Routes

//Obtener una empresa
router.get(
  "/business/:userId/:busId",
  requireSignin,
  isAuth,
  isAdmin,
  readBusinessId
);
//Obtener todos las empresas
router.get("/business/:userId", requireSignin, isAuth, isAdmin, listBusiness);

//Crear
router.post(
  "/business/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createBusiness
);
//Actualizar empresa
router.put(
  "/business/:busId",
  update
);

router.delete(
  "/business/:userId/:busId",
  requireSignin,
  isAuth,
  isAdmin,
  deleteBusiness
);

router.param("busId", businessId);
router.param("userId", userById);

module.exports = router;