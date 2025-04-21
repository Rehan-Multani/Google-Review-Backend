import Controllers from "../Models/Model.js";
const review_analysisTable = new Controllers("review_analysis");
import db from "../Config/Connection.js"

class review_analysisController {

    static async getAllReviewAnalysis(req, res) {
        try {
            const { business_id, branch_id } = req.query;
            const [result] = await db.query("SELECT * FROM review_analysis WHERE user_id = ? AND qr_code_id= ? ", [business_id, branch_id])
            if (result.length > 0) {
                return res.status(200).json({
                    success: true,
                    message: "Review analysis fetched successfully",
                    data: result,
                });
            } else {
                return res.status(404).json({ message: "No review analysis found." });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async createReviewAnalysis(req, res) {
        try {
            const { problems, sentiment, solutions, user_id, qr_code_id } = req.body;

            // Validate input data
            if (!problems || !sentiment || !solutions || !user_id || !qr_code_id) {
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
}

export default review_analysisController;
