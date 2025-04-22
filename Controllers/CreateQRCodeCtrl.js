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
      const { user_id, url, headline, footer, size, qr_color, offer, place_id, location } = req.body;

      let imageUrl = "";

      if (req.files && req.files.image) {
        const imageFile = req.files.image;

        console.log("Image file found:", imageFile.name);
        console.log("tempFilePath:", imageFile.tempFilePath);

        const uploadResult = await cloudinary.uploader.upload(
          imageFile.tempFilePath,
          {
            folder: "qrcodes",
            resource_type: "image"
          }
        );

        console.log("Cloudinary uploaded URL:", uploadResult.secure_url);

        imageUrl = uploadResult.secure_url;
      } else {
        console.log("No image file uploaded.");
      }

      const dataToSave = {
        user_id,
        url,
        headline,
        footer,
        size,
        qr_color,
        offer,
        location,
        place_id,
        image: imageUrl  // Save to `image` column in DB
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
      const { user_id } = req.params; // Extract user_id from request params

      // Fetch all company data matching the user_id from the qr_code table
      const [companyData] = await db.query(
        `SELECT * FROM qr_code WHERE user_id = ?`,
        [user_id]  // The user_id is used to match company_id
      );

      if (companyData.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No QR codes found for the specified user_id"
        });
      }

      // Fetch user data based on user_id
      const [response] = await db.query(`SELECT first_name, last_name ,email FROM company WHERE id=?`, [user_id]);
      console.log("response", response);

      const [banner] = await db.query(`SELECT image, user_id,qr_code_id FROM banner WHERE user_id=?`, [user_id]);
      console.log("banner", banner);

      // Combine all companyData records with the user data
      // Combine all companyData records with the user data and banner image
      const combinedData = companyData.map(item => ({
        ...item, // Spread the companyData to include all fields
        name: `${response[0].first_name} ${response[0].last_name}`, // Add user name
        email: response[0].email, // Add user email
        image: banner[0]?.image || null // Add banner image, handle if banner is missing
      }));


      return res.status(200).json({
        success: true,
        data: combinedData // Send the combined data for all records
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
