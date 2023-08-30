import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

//@desc    authenticate user & get token
//@api     POST /api/users/login
//@access  public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc    register a new user
//@api     POST /api/users
//@access  public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(401);
    throw new Error("User already exist");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc    get user profile
//@api     GET /api/users/profile
//@access  Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc    update user profile
//@api     PUT /api/users/profile
//@access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.send({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc    get all users for admin dashboard
//@api     GET /api/users/getuser
//@access  Private/ ADMIN
export const getUsers = asyncHandler(async (req, res) => {
  const allUser = await User.find()
  res.send(allUser)
});

//@desc    Delete user
//@api     DELETE /api/users/:id
//@access  Private/ ADMIN
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id)
  if(user){
    //await user.remove()
    res.json({message: "User removed"})
  }else{
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc    get users by ID for admin dashboard
//@api     GET /api/users/:id
//@access  Private/ ADMIN
export const getUsersByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")
  if(user){
    res.json(user)
  }else{
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc    get user profile
//@api     PUT /api/users/profile
//@access  Private/ ADMIN
export const updateProfileByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin
    
    const updateUser = await user.save();

    res.send({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});