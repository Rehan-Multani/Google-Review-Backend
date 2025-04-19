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



class companyController {

  static async createCompany(req, res) {
    try {
      const { business_name, business_type, first_name, last_name, location, email, password } = req.body;

      // ✅ Only check for required fields
      if (!business_name) {
        return res.status(400).json({ error: "business_name and business_type are required." });
      }

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

      return res.status(200).json({
        success: true,
        message: "Company fetched successfully",
        data: companyData,
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



  // static async getCompanyDetails(req, res) {
  //   try {
  //     const { business_name, headline } = req.query;

  //     // Step 1: Fetch all business names
  //     const query = `SELECT business_name FROM company`;
  //     const [businessNames] = await db.query(query);

  //     if (businessNames.length === 0) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "No business names found."
  //       });
  //     }

  //     // If business_name is provided, proceed with fetching headlines and review data
  //     if (business_name) {
  //       // Fetch headlines for the given business_name
  //       const query = `
  //         SELECT q.headline
  //         FROM qr_code q
  //         JOIN company c ON q.user_id = c.id
  //         WHERE c.business_name = ?
  //       `;
  //       const [headlinesResult] = await db.query(query, [business_name]);

  //       if (headlinesResult.length === 0) {
  //         return res.status(404).json({
  //           success: false,
  //           message: "No headlines found for the provided business_name."
  //         });
  //       }

  //       let selectedHeadline = headline || headlinesResult[0].headline; // Use provided headline, else use the first one

  //       // Get user_id from qr_code for the selected headline
  //       const qrQuery = `SELECT user_id FROM qr_code WHERE headline = ?`;
  //       const [qrResult] = await db.query(qrQuery, [selectedHeadline]);

  //       const userId = qrResult[0].user_id;

  //       // Total reviews
  //       const totalQuery = `SELECT COUNT(*) AS total FROM review WHERE user_id = ?`;
  //       const [totalResult] = await db.query(totalQuery, [userId]);
  //       const totalReviews = totalResult[0].total;

  //       // Average rating
  //       const avgQuery = `SELECT AVG(rating) AS averageRating FROM review WHERE user_id = ?`;
  //       const [avgResult] = await db.query(avgQuery, [userId]);
  //       const averageRating = parseFloat(avgResult[0].averageRating || 0).toFixed(1);

  //       // Latest 2 reviews
  //       const allQuery = `
  //         SELECT id, rating, feedback, created_at 
  //         FROM review 
  //         WHERE user_id = ? 
  //         ORDER BY created_at DESC
  //         LIMIT 2
  //       `;
  //       const [reviews] = await db.query(allQuery, [userId]);

  //       return res.status(200).json({
  //         success: true,
  //         message: "Headlines and review data fetched successfully.",
  //         data: {
  //           headlines: headlinesResult, // List of headlines
  //           reviewData: {
  //             headline: selectedHeadline,
  //             totalReviews,
  //             averageRating,
  //             reviews
  //           }
  //         }
  //       });
  //     }

  //     // Step 2: If no business_name provided, return all business names
  //     return res.status(200).json({
  //       success: true,
  //       message: "Business names fetched successfully",
  //       data: businessNames
  //     });

  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "An error occurred while fetching business names and review data.",
  //       error: error.message
  //     });
  //   }
  // }


  //   static async getCompanyDetails(req, res) {
  //     try {
  //       const { business_name, headline } = req.query;

  //       // Step 1: Fetch all business names
  //       const query = `SELECT business_name FROM company`;
  //       const [businessNames] = await db.query(query);

  //       if (businessNames.length === 0) {
  //         return res.status(404).json({
  //           success: false,
  //           message: "No business names found."
  //         });
  //       }

  //       // If business_name is provided, proceed with fetching headlines and review data
  //       if (business_name) {
  //         // Fetch headlines for the given business_name
  //         const query = `
  //           SELECT q.headline, q.id as qr_code_id
  //           FROM qr_code q
  //           JOIN company c ON q.user_id = c.id
  //           WHERE c.business_name = ?
  //         `;
  //         const [headlinesResult] = await db.query(query, [business_name]);

  //         if (headlinesResult.length === 0) {
  //           return res.status(404).json({
  //             success: false,
  //             message: "No headlines found for the provided business_name."
  //           });
  //         }

  //         // If no headline is provided, return business data with available headlines
  //         if (!headline) {
  //           return res.status(200).json({
  //             success: true,
  //             message: "Business names fetched successfully",
  //             data: {
  //               businessNames,
  //               headlines: headlinesResult // Return all available headlines for the business
  //             }
  //           });
  //         }

  //         // Find matching qr_code_id for the provided headline
  //         const selectedQrCode = headlinesResult.find(item => item.headline === headline);
  //         const qr_code_id = selectedQrCode ? selectedQrCode.qr_code_id : null;

  //         // If no matching headline, return error message and skip reviews
  //         if (!qr_code_id) {
  //           return res.status(404).json({
  //             success: false,
  //             message: "No matching QR code found for the selected headline."
  //           });
  //         }

  //         // Fetch Total Reviews for the selected qr_code_id
  //         const totalQuery = `
  //           SELECT COUNT(*) AS total 
  //           FROM review r
  //           WHERE r.qr_code_id = ?
  //         `;
  //         const [totalResult] = await db.query(totalQuery, [qr_code_id]);
  //         const totalReviews = totalResult[0].total;

  //         // Fetch Average Rating for the selected qr_code_id
  //         const avgQuery = `
  //           SELECT AVG(r.rating) AS averageRating 
  //           FROM review r
  //           WHERE r.qr_code_id = ?
  //         `;
  //         const [avgResult] = await db.query(avgQuery, [qr_code_id]);
  //         const averageRating = parseFloat(avgResult[0].averageRating || 0).toFixed(1);

  //         // Fetch Latest 2 reviews for the selected qr_code_id
  //         const allQuery = `
  //           SELECT r.id, r.rating, r.feedback, r.created_at 
  //           FROM review r
  //           WHERE r.qr_code_id = ?
  //           ORDER BY r.created_at DESC
  //           LIMIT 2
  //         `;
  //         const [reviews] = await db.query(allQuery, [qr_code_id]);

  //         return res.status(200).json({
  //           success: true,
  //           message: "Headlines and review data fetched successfully.",
  //           data: {
  //             headlines: headlinesResult, // List of headlines
  //             reviewData: {
  //               headline: headline,
  //               totalReviews,
  //               averageRating,
  //               reviews
  //             }
  //           }
  //         });
  //       }

  //       // Step 2: If no business_name provided, return all business names
  //       return res.status(200).json({
  //         success: true,
  //         message: "Business names fetched successfully",
  //         data: businessNames
  //       });

  //     } catch (error) {
  //       return res.status(500).json({
  //         success: false,
  //         message: "An error occurred while fetching business names and review data.",
  //         error: error.message
  //       });
  //     }
  // }

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
  
  // static async getCompanyHeadlineDetails(req, res) {
  //   try {
  //     const { business_name } = req.query;

  //     if (!business_name) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "business_name is required in the request body."
  //       });
  //     }

  //     const query = `
  //       SELECT q.headline
  //       FROM qr_code q
  //       JOIN company c ON q.user_id = c.id
  //       WHERE c.business_name = ?
  //     `;

  //     const [result] = await db.query(query, [business_name]);

  //     if (result.length > 0) {
  //       return res.status(200).json({
  //         success: true,
  //         message: "Headlines fetched successfully",
  //         data: result // returns array of headline rows
  //       });
  //     }

  //     return res.status(404).json({
  //       success: false,
  //       message: "No headlines found for the provided business_name."
  //     });

  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "An error occurred while fetching headlines.",
  //       error: error.message
  //     });
  //   }
  // }



  // static async getReviewHeadline(req, res) {
  //   try {
  //     const { headline } = req.query;

  //     if (!headline) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "headline is required in query params."
  //       });
  //     }

  //     // Get user_id and qr_code_id from qr_code
  //     const qrQuery = `SELECT user_id FROM qr_code WHERE headline = ?`;
  //     const [qrResult] = await db.query(qrQuery, [headline]);

  //     if (qrResult.length === 0) {
  //       return res.status(404).json({
  //         success: false,
  //         message: "No QR code found for the provided headline."
  //       });
  //     }

  //     const userId = qrResult[0].user_id;
  //     const qrCodeId = qrResult[0].id;

  //     // Total reviews
  //     const totalQuery = `SELECT COUNT(*) AS total FROM review WHERE user_id = ?`;
  //     const [totalResult] = await db.query(totalQuery, [userId]);
  //     const totalReviews = totalResult[0].total;

  //     // Average rating
  //     const avgQuery = `SELECT AVG(rating) AS averageRating FROM review WHERE user_id = ?`;
  //     const [avgResult] = await db.query(avgQuery, [userId]);
  //     const averageRating = parseFloat(avgResult[0].averageRating || 0).toFixed(1);

  //     // Latest 2 reviews
  //     const allQuery = `
  //       SELECT id, rating, feedback, created_at 
  //       FROM review 
  //       WHERE user_id = ?
  //       ORDER BY created_at DESC
  //       LIMIT 2
  //     `;
  //     const [reviews] = await db.query(allQuery, [userId]);

  //     return res.status(200).json({
  //       success: true,
  //       message: "Review data fetched successfully for the given headline.",
  //       data: {
  //         headline,
  //         totalReviews,
  //         averageRating,
  //         reviews
  //       }
  //     });

  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "An error occurred while fetching review data.",
  //       error: error.message
  //     });
  //   }
  // }






}


export default companyController;





