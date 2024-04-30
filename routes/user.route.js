import { Router } from "express";
import {
  signup,
  login,
  getProtected,
  getAdmin,
} from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", isAuth, getProtected);
router.get("/admin", isAuth, isAdmin, getAdmin);

export default router;
