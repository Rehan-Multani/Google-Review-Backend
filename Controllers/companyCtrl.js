import Controllers from "../Models/Model.js";
import db from "../Config/Connection.js"
import bcrypt from 'bcrypt';

const company = new Controllers("company");
const business_name = new Controllers("qr_code");
import cloudinary from '../Config/cloudinary.js';


cloudinary.config({
  cloud_name: 'dkqcqrrbp',
  api_key: '418838712271323',
  api_secret: 'p12EKWICdyHWx8LcihuWYqIruWQ'
});



class companyController {

  static async createCompany(req, res) {
    try {
      const { business_name, business_type, first_name, last_name, location, email, password } = req.body;

      // // ✅ Only check for required fields
      // if (!business_name) {
      //   return res.status(400).json({ error: "business_name and business_type are required." });
      // }

      // ✅ Check if email exists only if email is provided
      if (email) {
        const existingCompany = await company.findEmail(email);
        if (existingCompany) {
          return res.status(409).json({ error: "Email already exists." });
        }
      }

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
        console.log("No image file uploaded.");
      }

      // ✅ Hash password only if it's provided
      let hashedPassword = null;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      // ✅ Prepare data, include only what is defined
      const dataToSave = {
        business_name,
        business_type,
        image: imageUrl,
      };


      if (first_name) dataToSave.first_name = first_name;
      if (last_name) dataToSave.last_name = last_name;
      if (location) dataToSave.location = location;
      if (email) dataToSave.email = email;
      if (hashedPassword) dataToSave.password = hashedPassword;

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

 static async createCompany(req, res) {
    try {
      const { business_name, business_type, first_name, last_name, location, email, password } = req.body;

      // // ✅ Only check for required fields
      // if (!business_name) {
      //   return res.status(400).json({ error: "business_name and business_type are required." });
      // }

      // ✅ Check if email exists only if email is provided
      if (email) {
        const existingCompany = await company.findEmail(email);
        if (existingCompany) {
          return res.status(409).json({ error: "Email already exists." });
        }
      }

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
        console.log("No image file uploaded.");
      }

      // ✅ Hash password only if it's provided
      let hashedPassword = null;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      // ✅ Prepare data, include only what is defined
      const dataToSave = {
        business_name,
        business_type,
        image: imageUrl,
      };


      if (first_name) dataToSave.first_name = first_name;
      if (last_name) dataToSave.last_name = last_name;
      if (location) dataToSave.location = location;
      if (email) dataToSave.email = email;
      if (hashedPassword) dataToSave.password = hashedPassword;

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

  static async getCompanyById(req, res) {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ error: "Company ID is required." });
      }
  
      const companyData = await company.getById(id);
  
      if (!companyData) {
        return res.status(404).json({ message: "Company not found." });
      }
  
      const user_id = companyData.id;
  
      const [businessReviews] = await db.query("SELECT * FROM review WHERE user_id = ?", [user_id]);
  
      const totalReviews = businessReviews.length;
      const averageRating = totalReviews > 0
        ? parseFloat((businessReviews.reduce((acc, review) => acc + Number(review.rating || 0), 0) / totalReviews).toFixed(1))
        : 0;
  
      // Get recent 2 reviews (sorted by created_at descending)
      const recentReviews = businessReviews
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 2);
  
      return res.status(200).json({
        success: true,
        message: "Company fetched successfully",
        data: companyData,
        totalReviews,
        averageRating,
        recentReviews
      });
  
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  
  static async deleteCompany(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Company ID is required." });
      }

      const result = await company.delete(id); // delete from DB

      if (result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "Company deleted successfully",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "No company found with this ID.",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async updateCompanyStatus(req, res) {
    try {
      const companyId = req.params.id;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const result = await company.update(companyId, { status });

      if (result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "Company status updated successfully",
        });
      } else {
        return res.status(404).json({ message: "Company not found" });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async getCompanyDetails(req, res) {
    try {
      const { business_id, brach_id } = req.query;

      // Check if both IDs are provided
      if (business_id && brach_id) {
        // Get total review count and average rating
        const [statsResult] = await db.query(
          `SELECT 
              COUNT(*) AS total_reviews,
              AVG(rating) AS average_rating
           FROM review 
           WHERE user_id = ? AND qr_code_id = ?`,
          [business_id, brach_id]
        );

        // Get last 2 reviews by created_at
        const [lastTwoReviews] = await db.query(
          `SELECT * FROM review 
           WHERE user_id = ? AND qr_code_id = ? 
           ORDER BY created_at DESC 
           LIMIT 2`,
          [business_id, brach_id]
        );

        return res.json({
          success: true,
          stats: statsResult[0],
          last_two_reviews: lastTwoReviews
        });
      }

      // If only business_id is provided, return its QR codes
      if (business_id) {
        const [qrResult] = await db.query(
          "SELECT headline, id FROM qr_code WHERE user_id = ?",
          [business_id]
        );

        return res.json({
          success: true,
          qr_codes: qrResult
        });
      }

      // If neither, return companies list
      const [companyResult] = await db.query("SELECT business_name, id FROM company");
      return res.json({
        success: true,
        companies: companyResult
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching company, QR, or review data.",
        error: error.message
      });
    }
  }

  static async getCompanyDetailsforSentimentAnalytics(req, res) {
    try {
      const { business_id, brach_id, frequency } = req.query;

      if (business_id && brach_id) {
        // Get total review count and average rating
        const [statsResult] = await db.query(
          `SELECT 
              COUNT(*) AS total_reviews,
              AVG(rating) AS average_rating
           FROM review 
           WHERE user_id = ? AND qr_code_id = ?`,
          [business_id, brach_id]
        );

        // Get last 2 reviews
        const [lastTwoReviews] = await db.query(
          `SELECT * FROM review 
           WHERE user_id = ? AND qr_code_id = ? 
           ORDER BY created_at DESC 
           LIMIT 2`,
          [business_id, brach_id]
        );

        // Determine group by based on frequency
        let groupByClause = "DATE(created_at)";
        if (frequency === "monthly") groupByClause = "DATE_FORMAT(created_at, '%Y-%m')";
        else if (frequency === "yearly") groupByClause = "YEAR(created_at)";

        // Get sentiment breakdown
        const [sentimentStats] = await db.query(
          `SELECT 
              ${groupByClause} as period,
              SUM(CASE WHEN rating >= 4 THEN 1 ELSE 0 END) AS positive_reviews,
              SUM(CASE WHEN rating = 3 THEN 1 ELSE 0 END) AS neutral_reviews,
              SUM(CASE WHEN rating <= 2 THEN 1 ELSE 0 END) AS negative_reviews
           FROM review
           WHERE user_id = ? AND qr_code_id = ?
           GROUP BY period
           ORDER BY period DESC`,
          [business_id, brach_id]
        );

        return res.json({
          success: true,
          // stats: statsResult[0],
          // last_two_reviews: lastTwoReviews,
          sentiment_trends: sentimentStats
        });
      }

      if (business_id) {
        const [qrResult] = await db.query(
          "SELECT headline, id FROM qr_code WHERE user_id = ?",
          [business_id]
        );
        return res.json({
          success: true,
          qr_codes: qrResult
        });
      }

      const [companyResult] = await db.query("SELECT business_name, id FROM company");
      return res.json({
        success: true,
        companies: companyResult
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching data.",
        error: error.message
      });
    }
  }



}


export default companyController;





