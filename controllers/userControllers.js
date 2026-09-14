const User = require("../models/userModel");
const mongoose = require ("mongoose");

// GET /users
// const getAllUsers = (req, res) => {
//   const users = User.getAll();
//   res.json(users);
// };

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort ({cretedAt: -1});
    res.status(200).json(users);
  
  } catch (error) {
    res.status(500).json({message: "Failed to retrieve users"});
  }
};

// POST /users
// const createUser = (req, res) => {
//   const { email } = req.body;
//   const existingUser = User.getAll().find((user) => user.email === email);
//   if (existingUser) {
//     return res.status(400).json({ message: "Failed to create user" });
//   }
//   const newUser = User.addOne({ ...req.body }); // Spread the req.body object

//   if (newUser) {
//     res.status(201).json(newUser);
//   } else {
//     // Handle error (e.g., failed to create user)
//     res.status(400).json({ message: "Invalid user data. Ensure all fields are provided, including 'account_verified' and 'company'." });
//   }
// };


const createUser = async (req, res) => {
  try {
    const newUser = await User.create({...req.body});
    res.status(201).json(newUser);
  }catch (error) {
    res.status(400).json({message: "Failed to create user", error: error.message})
  }
};
 
// // GET /users/:userId
// const getUserById = (req, res) => {
//   const userId = req.params.userId;
//   const user = User.findById(userId);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// };


const getUserById = async (req,res) => {
  const {userId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json ({message: "Invalid user ID"});
  }


try {
  const user = await User.findById (userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({message: "User not found"});
  }
} catch (error) {
  res.status(500).json({message: "Failed to retrieve user"});
}
};



// // PUT /users/:userId
// const updateUser = (req, res) => {
//   const userId = req.params.userId;
//   if (isNaN(userId)) {
//     return res.status(400).json({ message: "Invalid user ID" });
//   }
//   const updatedUser = User.updateOneById(userId, { ...req.body }); // Spread the req.body object

//   if (updatedUser) {
//     res.json(updatedUser);
//   } else {
//     // Handle update failure (e.g., user not found)
//     res.status(404).json({ message: "User not found" });
//   }
// };


const updateUser = async (req, res) => {
  const {userId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json ({message: "Invalid user ID"});
  }

  try {
    const updatedUser = await User.findOneAndUpdate(
      {_id: userId},
      {...req.body},
      {new: true}
    );

    if (updatedUser) {
      res.status (200).json(updatedUser);
    }else {
      res.status (404).json({message: "User not found"});
    }

  } catch (error) {
    res.status(500).json({message: "Failed to update user"});
  }
};







// // DELETE /users/:userId
// const deleteUser = (req, res) => {
//   const userId = req.params.userId;
//   if (isNaN(userId)) {
//     return res.status(400).json({ message: "Invalid user ID" });
//   }
//   const isDeleted = User.deleteOneById(userId);

//   if (isDeleted) {
//     res.status(204).send();
//   } else {
//     // Handle deletion failure (e.g., user not found)
//     res.status(404).json({ message: "User not found" });
//   }
// };

const deleteUser = async (req, res) => {
  const {userId} = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({message: "Invalid user ID"});
  }
  try {
    const deletedUser = await User.findOneAndDelete({_id: userId});

    if (deletedUser) {
      res.status (200).json({message: "User deleted successfully"});
    }else {
      res.status (404).json({message: "User not found"});
    }
  } catch (error) {
    res.status (500).json({message: "Failed to delete user"});
  }
};





module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

