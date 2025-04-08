import Controllers from "../Models/Model.js";
import { generateToken } from "../Config/Jwt.js";
import bcrypt from "bcrypt";

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

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await userTable.create({
        name,
        email,
        password: hashedPassword,
        phone,
        group_id
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

      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password." });
      }

      const find_groupName = await groupTable.getById(existingUser.group_id)

      const group_name=find_groupName.group_name
      
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          id: existingUser.id,
          id: existingUser.id,
          group_name,
          email: existingUser.email,
          phone: existingUser.phone,
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

      if (!name && !email && !phone && !password) {
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
      if (password) updatedData.password = hashedPassword;

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
