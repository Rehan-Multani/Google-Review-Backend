import Controllers from "../Models/Model.js";
import db from "../Config/Connection.js"

const banner = new Controllers("banner");
import cloudinary from '../Config/cloudinary.js';


cloudinary.config({
  cloud_name: 'dkqcqrrbp',
  api_key: '418838712271323',
  api_secret: 'p12EKWICdyHWx8LcihuWYqIruWQ'
});



class bannerController{

    static async createBanner(req, res) {
        try {
          const { user_id } = req.body;
      
          let imageUrl = "";
      
          if (req.files && req.files.image) {
            const imageFile = req.files.image;
      
            console.log("✅ Image file found:", imageFile.name);
            console.log("📂 tempFilePath:", imageFile.tempFilePath);
      
            const uploadResult = await cloudinary.uploader.upload(
              imageFile.tempFilePath,
              {
                folder: "banner",
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
            image: imageUrl  // ✅ Save to `image` column in DB
          };
      
          const resultData = await banner.create(dataToSave);
          const inserted = await banner.getById(resultData.insertId);
      
          return res.status(201).json({
            success: true,
            message: "Banner created successfully",
            data: inserted
          });
      
        } catch (error) {
          console.log("❌ Error while creating banner:", error);
          return res.status(500).json({
            success: false,
            error: error.message || "Something went wrong"
          });
        }
    }

    
   static async getByBanner(req, res) {
       try {

         const { user_id } = req.params;

         const [data] = await db.query(
           `SELECT 
             b.*, 
             u.name, 
             u.email
           FROM banner b
           JOIN users u ON u.id = b.user_id`,
           [user_id]

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


}





export default bannerController;


