import express from "express";
import {
  addAccount,
  createTransaction,
  deleteAccount,
  deleteTransaction,
  getAllTransactionById,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.use(protectRoute)
router.get("/:id", getAllTransactionById);
router.post("/create", createTransaction);
router.post("/add-account", addAccount);
router.delete("/delete-account", deleteAccount)
router.delete("/delete-transaction", deleteTransaction)

export default router;
