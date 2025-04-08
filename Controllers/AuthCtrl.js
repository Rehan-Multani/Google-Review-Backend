import Controllers from "../Models/Model.js";
import { generateToken } from "../Config/Jwt.js";
import bcrypt from "bcrypt";

import cloudinary from '../Config/cloudinary.js';

cloudinary.config({
  cloud_name: 'dkqcqrrbp',
  api_key: '418838712271323',
  api_secret: 'p12EKWICdyHWx8LcihuWYqIruWQ'
});

const userTable = new Controllers("users");
const groupTable = new Controllers("groups");

class UserController {

  static async getallUser(req, res) {
    try {
      const result = await userTable.getAll();
      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          data: result,
          message: "Users fetched successfully",
        });
      } else {
        return res.status(404).json({ message: "No users found." });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async getUserById(req, res) {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ error: "User ID is required." });
      }
  
      const user = await userTable.getById(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  


  static async getAllGroup(req, res) {
    try {
      const groupId = 2;
      const result = await userTable.getByGroupId(groupId); // ⬅️ use new method
  
      if (result.length > 0) {
        return res.status(200).json({ 
          success: true,
          message: "Group users fetched successfully",
          group_name: result[0].group_name, // ⬅️ get group name from first user
          data: result,
        });
      } else {
        return res.status(404).json({ message: "No users found in group." });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  



  static async updateStatus(req, res) {
    try {
      const userId = req.params.id;
      const { status } = req.body;
  
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
  
      const result = await userTable.update(userId, { status });
  
      if (result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "User status updated successfully",
        });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  

  static async createUser(req, res) {
    try {
      const { name, email, password, group_id, phone } = req.body;

      if (!email || !password || !name || !group_id) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const existingUser = await userTable.findEmail(email);

      if (existingUser) {
        return res.status(409).json({ error: "Email already in use." });
      }
      
      let imageUrl = "";

      // Check if image is uploaded
      if (req.files && req.files.image) {
        const uploadedImage = await cloudinary.uploader.upload(
          req.files.image.tempFilePath || req.files.image.path,
          { folder: "user_images" }
        );
        imageUrl = uploadedImage.secure_url;
      }



      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await userTable.create({
        name,
        email,
        password: hashedPassword,
        phone,
        group_id,
        image: imageUrl
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: result,

      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "All fields are required." });
      }

      const existingUser = await userTable.findEmail(email);
      if (!existingUser) {
        return res.status(409).json({ message: "User not found with this email." });
      }


        // 🔒 Restrict login if group_id = 2 and status = 0
      if (existingUser.group_id == 2 && existingUser.status == 0) {
          return res.status(403).json({ message: "Your account is inactive. Please contact superadmin." });
      }

      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      const find_groupName = await groupTable.getById(existingUser.group_id)
     
      //const group_name=find_groupName.group_name
      const group_name = find_groupName?.group_name || "";
      
      
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          id: existingUser.id,
          group_id:existingUser.group_id,
          name: existingUser.name,
          group_name,
          email: existingUser.email,
          phone: existingUser.phone,
          image: existingUser.image,
          token: generateToken(existingUser.id),
        },
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async editUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, phone, password } = req.body;

      if (!id) {
        return res.status(400).json({ error: "User ID is required." });
      }

      if (!name && !email && !password && !req.files?.image) {
        return res.status(400).json({ error: "At least one field is required to update." });
      }

      const existingUser = await userTable.getById(id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found." });
      }
      const hashedPassword = bcrypt.hash(password, 10)
      const updatedData = {};
      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
      if (phone) updatedData.phone = phone;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      }

      // ✅ Cloudinary image upload
      if (req.files && req.files.image) {
        const file = req.files.image;
        const cloudResult = await cloudinary.uploader.upload(file.tempFilePath);
        updatedData.image = cloudResult.secure_url;
      }

      const result = await userTable.update(id, updatedData);

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "User not updated. Please try again." });
      }

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "User ID is required." });
      }
      const [result] = await userTable.delete(id)

      if (result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "User updated successfully",
        })
      }

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

}



export default UserController;
