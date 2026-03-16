import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../emailVerify/verifyEmail.js";
import { Session } from "../models/sessionModel.js";
import { sendOTPMail } from "../emailVerify/sendOTPMail.js";
import cloudinary from "../utils/cloudinary.js"

//Register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User Already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email); //send email here
    newUser.token = token;
    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//verify
export const verify = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Authorization token is missing or invalid",
      });
    }
    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message: "The Registration token has expired",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Token Verification Failed",
      });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    user.token = null;
    user.isVerified = true;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//reverify
export const reVerify = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "10m",
    });
    verifyEmail(token, email);
    user.token = token;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Verification Email Send again Successfully",
      token: user.token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All Feilds are required",
      });
    }
    const exisitingUser = await User.findOne({ email });
    if (!exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "User not exist",
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      exisitingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Crendentials",
      });
    }
    if (exisitingUser.isVerified === false) {
      return res.status(400).json({
        success: false,
        message: "Verify your account than login",
      });
    }
    //Generate token
    const accessToken = jwt.sign(
      { id: exisitingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "10d" },
    );
    const refreshToken = jwt.sign(
      { id: exisitingUser._id },
      process.env.SECRET_KEY,
      { expiresIn: "30d" },
    );

    exisitingUser.isLoggedIn = true;
    await exisitingUser.save();
    //check for exisiting sessiona and delete it
    const exisitingSession = await Session.findOne({
      userId: exisitingUser._id,
    });
    if (exisitingSession) {
      await Session.deleteOne({ userId: exisitingUser._id });
    }
    //create a new session

    await Session.create({ userId: exisitingUser._id });
    return res.status(200).json({
      success: true,
      message: `Welcome back ${exisitingUser.firstName}`,
      user: exisitingUser,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//logout

export const logout = async (req, res) => {
  try {
    const userId = req.id;
    await Session.deleteMany({ userId: userId });
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });
    return res.status(200).json({
      success: true,
      message: "User logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//forgot password

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); //10 min
    user.otp = otp;
    user.otpExpiry = otpExpiry;

    await user.save();
    await sendOTPMail(otp, email);
    return res.status(200).json({
      success: true,
      message: "OTP send to email successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//verify otp
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.params.email;
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not found",
      });
    }
    if (!user.otp || !user.otpExpiry) {
      return res.status(403).json({
        success: false,
        message: "OTP is not gernerated or already verified",
      });
    }
    if (user.otpExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired please request a new one",
      });
    }
    if (otp !== user.otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is invalid",
      });
    }
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "OTP Verified Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//change password

export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password do not match",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Password change successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//all- user

export const allUser = async (_, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get User by Id

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params; //extract userId from request params
    const user = await User.findById(userId).select(
      "-password -otp -otpExpiry -token",
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//upadate user

export const updateUser = async (req, res) => {
  try {
    const userIdToUpdate = req.params.id;
    const loggedUser = req.user;

    const { firstName, lastName, address, city, zipCode, phoneNo, role } =
      req.body;

    // Authorization check
    if (
      loggedUser._id.toString() !== userIdToUpdate &&
      loggedUser.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this profile",
      });
    }

    let user = await User.findById(userIdToUpdate);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let profilePicUrl = user.profilePic;
    let profilePicPublicId = user.profilePicPublicId;

    // If a new file is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (profilePicPublicId) {
        await cloudinary.uploader.destroy(profilePicPublicId);
      }

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "profiles" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      profilePicUrl = uploadResult.secure_url;
      profilePicPublicId = uploadResult.public_id;
    }

    // Update fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.city = city || user.city;
    user.zipCode = zipCode || user.zipCode;
    user.phoneNo = phoneNo || user.phoneNo;
    user.role = role || user.role;
    user.profilePic = profilePicUrl;
    user.profilePicPublicId = profilePicPublicId;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
