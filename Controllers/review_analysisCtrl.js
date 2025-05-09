import Controllers from "../Models/Model.js";
const review_analysisTable = new Controllers("review_analysis");
const servay_reviews = new Controllers("review_survey");
import db from "../Config/Connection.js"

class review_analysisController {

  static async getAllReviewAnalysis(req, res) {
    try {
      const { business_id, branch_id, from_date, to_date } = req.query;

      if (!business_id || !branch_id) {
        return res.status(400).json({ success: false, message: "Missing business_id or branch_id" });
      }

      let dateCondition = "";
      const params = [business_id, branch_id];

      if (from_date && to_date) {
        dateCondition = "AND DATE(created_at) BETWEEN ? AND ?";
        params.push(from_date, to_date);
      }

      const [result] = await db.query(`
            SELECT 
              DATE_FORMAT(created_at, '%Y-%m') AS month,
              SUM(CASE WHEN sentiment = 'positive' THEN 1 ELSE 0 END) AS positive,
              SUM(CASE WHEN sentiment = 'negative' THEN 1 ELSE 0 END) AS negative,
              SUM(CASE WHEN sentiment = 'neutral' THEN 1 ELSE 0 END) AS neutral
            FROM 
              review_analysis
            WHERE 
              user_id = ? AND qr_code_id = ?
              ${dateCondition}
            GROUP BY 
              DATE_FORMAT(created_at, '%Y-%m')
            ORDER BY
              month DESC
          `, params);

      if (result.length > 0) {
        return res.status(200).json({
          success: true,
          message: "Monthly sentiment counts fetched successfully",
          data: result,
        });
      } else {
        return res.status(404).json({ success: false, message: "No sentiment data found." });
      }

    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }



  static async createReviewAnalysis(req, res) {
    try {
      const { problems, sentiment, solutions, user_id, qr_code_id, review_id, summary, reply,emotional_tone } = req.body;

      // Validate input data
      if (!problems || !sentiment || !solutions || !user_id || !qr_code_id || !review_id || !summary || !reply || !emotional_tone) {
        return res.status(400).json({ error: "All fields are required." });
      }

      // Generate Order ID (if needed)

      // Insert new review analysis into the database
      const result = await review_analysisTable.create({
        problems: JSON.stringify(problems),
        sentiment,
        solutions: JSON.stringify(solutions),
        user_id,
        qr_code_id,
        review_id,
        summary,
        reply,
        emotional_tone
      });

      if (result) {
        return res.status(201).json({
          success: true,
          message: "Review analysis created successfully",
          data: result,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to create review analysis",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async createreview_servay(req, res) {
    try {
      const { survey_review, user_id, qr_code_id } = req.body;

      const [existingServay] = await db.query("SELECT * FROM review_survey WHERE user_id = ? AND qr_code_id = ? ", [user_id, qr_code_id])
      console.log(existingServay);
      if (existingServay.length > 0) {
        return res.status(409).json("For this buisness you already created a servay form")
      }
      // if (!survey_review || !user_id || !qr_code_id || !human_message) {
      //   return res.status(400).json({ error: "All fields are required." });
      // }

      const result = await servay_reviews.create({
        survey_review: JSON.stringify(survey_review),
        user_id,
        qr_code_id,
      });

      if (result) {
        return res.status(201).json({
          success: true,
          message: "createreview_servay created successfully",
          data: result,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to create createreview_servay",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  static async getreview_servay(req, res) {
    try {
      const { user_id, qr_code_id } = req.query;

      if (user_id && qr_code_id) {
        let [result] = await db.query(
          "SELECT * FROM review_survey WHERE user_id = ? AND qr_code_id = ?",
          [user_id, qr_code_id]
        );
        let [ress] = await db.query("SELECT * FROM qr_code WHERE id = ? ", [qr_code_id[0]])
        console.log(ress);
        result = result.map((e) => ({
          ...e,
          language: ress[0].language,
          survey_review: e.survey_review ? JSON.parse(e.survey_review) : null,
        }));

        return res.status(200).json({
          success: true,
          message: "Review survey fetched successfully",
          data: result,
        });
      } else {
        let result = await servay_reviews.getAll();

        result = result.map((item) => ({
          ...item,
          survey_review: item.survey_review ? JSON.parse(item.survey_review) : null,
        }));

        return res.status(200).json({
          success: true,
          message: "All review surveys fetched successfully",
          data: result,
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


}

export default review_analysisController;
