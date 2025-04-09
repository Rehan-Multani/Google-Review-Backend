import Controllers from "../Models/Model.js";
import db from "../Config/Connection.js"

const QRCodeable = new Controllers("qr_code");
import cloudinary from '../Config/cloudinary.js';

cloudinary.config({
  cloud_name: 'dkqcqrrbp',
  api_key: '418838712271323',
  api_secret: 'p12EKWICdyHWx8LcihuWYqIruWQ'
});


class QRCodeController {

  static async getallQRCode(req, res) {
    try {
      const result = await QRCodeable.getAll();
      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          data: result,
          message: "QR codes fetched successfully",
        });
      } else {
        return res.status(404).json({ message: "No QR codes found." });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
   //old code 
  // static async createQRCode(req, res) {
  //   try {
  //     const {
  //       user_id,
  //       url,
  //       headline,
  //       footer,
  //       size,
  //       qr_color,
  //       banner_path
  //     } = req.body;

  //     // if (!url || !size || !qr_color || !headline || !banner_path || !footer) {
  //     //   return res.status(400).json({ error: "URL, size, and QR color are required." });
  //     // }

  //     const result = await QRCodeable.create({
  //       user_id,
  //       url,
  //       headline,
  //       footer,
  //       size,
  //       qr_color,
  //       banner_path,
  //     });

  //     return res.status(201).json({
  //       success: true,
  //       message: "QR code created successfully",
  //       data: result
  //     });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // }


  
  // new code
  static async createQRCode(req, res) {
    try {
      const { user_id, url, headline, footer, size, qr_color } = req.body;
  
      let imageUrl = "";
  
      if (req.files && req.files.image) {
        const imageFile = req.files.image;
  
        console.log("✅ Image file found:", imageFile.name);
        console.log("📂 tempFilePath:", imageFile.tempFilePath);
  
        const uploadResult = await cloudinary.uploader.upload(
          imageFile.tempFilePath,
          {
            folder: "qrcodes",
            resource_type: "image"
          }
        );
  
        console.log("✅ Cloudinary uploaded URL:", uploadResult.secure_url);
  
        imageUrl = uploadResult.secure_url;
      } else {
        console.log("❌ No image file uploaded.");
      }
  
      const dataToSave = {
        user_id,
        url,
        headline,
        footer,
        size,
        qr_color,
        image: imageUrl  // ✅ Save to `image` column in DB
      };
  
      const resultData = await QRCodeable.create(dataToSave);
      const inserted = await QRCodeable.getById(resultData.insertId);
  
      return res.status(201).json({
        success: true,
        message: "QR code created successfully",
        data: inserted
      });
  
    } catch (error) {
      console.log("❌ Error while creating QR Code:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Something went wrong"
      });
    }
  }

  static async getByQrcode(req, res) {
    try {
      const [data] = await db.query(
        `SELECT 
          q.id,
          q.user_id,
          q.url,
          q.headline,
          q.footer,
          q.size,
          q.qr_color,
          q.created_at,
          b.image, 
          u.name, 
          u.email
         
        FROM qr_code q
        JOIN users u ON u.id = q.user_id
        JOIN banner b ON b.qr_code_id = q.id`
      );
  
      if (!data || data.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No QR codes found"
        });
      }
  
      return res.status(200).json({
        success: true,
        data
      });
  
    } catch (error) {
      console.error("❌ Error in getByQrcode:", error);
      return res.status(500).json({
        success: false,
        error: error.message || "Internal Server Error"
      });
    }
  }
    
   
  static async editQRCode(req, res) {
    try {
      const { id } = req.params;
      const {
        url,
        headline,
        footer,
        size,
        qr_color
      } = req.body;

      let banner_path = null;
      if (req.file) {
        banner_path = req.file.path;
      }

      if (!id) {
        return res.status(400).json({ error: "QR Code ID is required." });
      }

      const updatedData = {};
      if (url !== undefined) updatedData.url = url;
      if (headline !== undefined) updatedData.headline = headline;
      if (footer !== undefined) updatedData.footer = footer;
      if (size !== undefined) updatedData.size = size;
      if (qr_color !== undefined) updatedData.qr_color = qr_color;
      if (banner_path !== null) updatedData.banner_path = banner_path;

      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ error: "At least one field is required to update." });
      }

      const result = await QRCodeable.update(id, updatedData);

      if (!result || result.affectedRows === 0) {
        return res.status(404).json({ error: "QR code not found or not updated." });
      }

      return res.status(200).json({
        success: true,
        message: "QR code updated successfully"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


  static async deleteQRCode(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "QR code ID is required." });
      }

      const result = await QRCodeable.delete(id);

      if (result.affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: "QR code deleted successfully",
        });
      } else {
        return res.status(404).json({ error: "QR code not found." });
      }

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  
  static async createBusiness(req, res) {
    try {
      const { google_business_id, qr_code_url, user_id } = req.body;
  
      if (!google_business_id || !qr_code_url || !user_id) {
        return res.status(400).json({
          error: "google_business_id, qr_code_url, and user_id are required.",
        });
      }
  
      const result = await QRCodeable.create({
        google_business_id,
        qr_code_url,
        user_id,
      });
  
      return res.status(201).json({
        success: true,
        message: "Google Business QR code entry created successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
}



export default QRCodeController;
