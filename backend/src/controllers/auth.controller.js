import User from "../models/user.model.js";
import bcrypt from "bcryptjs";`
`
export const signup = async(req, res) => {
  const { username, email, password } = req.body;
  
  try{
    if(!username || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8){
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
        return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser){
        return res.status(400).json({ message: "Username or email already exists" });
    }   

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);   
     


    const newUser = new User({username, email, password: hashedPassword });
    if (newUser){
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } else {
        res.status(500).json({ message: "Failed to create user" });
    }   
  }
  
  catch (error) {
    res.status(500).json({ message: "Error occurred while signing up" });
  }
}



