import Controllers from "../Models/Model.js";
import db from "../Config/Connection.js"
import bcrypt from 'bcrypt';

const company = new Controllers("company");
import cloudinary from '../Config/cloudinary.js';


cloudinary.config({
  cloud_name: 'dkqcqrrbp',
  api_key: '418838712271323',
  api_secret: 'p12EKWICdyHWx8LcihuWYqIruWQ'
});



class companyController{

    static async createCompany(req, res) {
        try {
          const { business_name, business_type } = req.body;

        //   // Validate required fields if needed
        //   if (!business_name || !business_type || !location || !email || !password) {
        //     return res.status(400).json({ error: "All fields are required." });
        //   }
      
          let imageUrl = "";
      
          if (req.files && req.files.image) {
            const imageFile = req.files.image;
      
            console.log("✅ Image file found:", imageFile.name);
            console.log("📂 tempFilePath:", imageFile.tempFilePath);
      
            const uploadResult = await cloudinary.uploader.upload(
              imageFile.tempFilePath,
              {
                folder: "company",
                resource_type: "image"
              }
            );
      
            console.log("✅ Cloudinary uploaded URL:", uploadResult.secure_url);
      
            imageUrl = uploadResult.secure_url;
          } else {
            console.log("❌ No image file uploaded.");
          }

          
      
          const dataToSave = {
            business_name,
            business_type,
            image: imageUrl  // ✅ Save to `image` column in DB
          };
      
          const resultData = await company.create(dataToSave);
          const inserted = await company.getById(resultData.insertId);
      
          return res.status(201).json({
            success: true,
            message: "Company created successfully",
            data: inserted
          });
      
        } catch (error) {
          console.log("❌ Error while creating Company:", error);
          return res.status(500).json({
            success: false,
            error: error.message || "Something went wrong"
          });
        }
  }



  static async getallCompany(req, res) {
    try {
      const result = await company.getAll();
  
      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Companies fetched successfully",
          data: result,
          
        });
      }
  
      return res.status(404).json({
        success: false,
        message: "No companies found.",
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching companies.",
        error: error.message,
      });
    }
  }
  





}


export default companyController;





