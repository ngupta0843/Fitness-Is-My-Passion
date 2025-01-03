const { get } = require("mongoose");
const Users = require("../../models/userModel.js");
const bcrypt = require("bcryptjs");

const postTest = async (req, res) => {
  const { email } = req.body;
  console.log(email); // This is fine for debugging, but you might want to remove it in production.

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Look for a user by email
    const user = await Users.findOne({ email });
    
    // If no user is found, return a 404
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user if found
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);  // Log the error for server-side debugging
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}


// Sign in route
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    res.status(200).json({
      result: {
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser.id,
        bio: existingUser.bio,
        profile_photo: existingUser.profile_photo,
        followers: existingUser.followers,
        following: existingUser.following,
        posts: existingUser.posts,
        saved_workouts: existingUser.saved_workouts,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Sign up route
const signup = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new Users({
      email,
      password: hashedPassword,
      name: `${firstname} ${lastname}`,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Test route (for debugging purposes)
const test = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new Users({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "Test user created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const testGet = async (req, res) => {
  res.status(200).json({ message: "Test GET route" });
};

const getUserList = async (req, res) => {
  try {
    const users = await Users.find({}, "name email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getCurrentUser = async (req, res) => {
  const { id } = req.query;
  const users = await Users.findOne({ email: id }, {});
  res.status(200).json(users);
};

const sendFriendRequest = async (req, res) => {
  const { cur_user, req_user } = req.body;
  try {
    const user = await Users.findOne({ email: cur_user });
    if (user.followers.includes(req_user)) {
      return res.status(400).json({ message: "Friend request already sent" });
    }
    user.followers.push(req_user);
    await user.save();
    const reqUser = await Users.findOne({email: req_user});
    reqUser.following.push(cur_user);
    await reqUser.save();
    return res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await Users.findOne({ email: id }, {});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateProfile = async (req, res) => {
  const { firstname, lastname, bio, email } = req.body.data;
  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    user.name = `${firstname} ${lastname}`
      ? `${firstname} ${lastname}`
      : user.name;
    user.bio = bio ? bio : user.bio ? user.bio : "";

    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  signin,
  signup,
  test,
  testGet,
  getUserList,
  getCurrentUser,
  sendFriendRequest,
  getUser,
  updateProfile,
  postTest,
};
