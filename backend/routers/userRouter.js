import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersByID,
  updateProfileByID,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/").post(registerUser);
userRouter.route("/login").post(authUser);
userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
userRouter.route("/userslist").get(protect, admin, getUsers);
userRouter
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUsersByID)
  .put(protect, admin, updateProfileByID);

export default userRouter;
