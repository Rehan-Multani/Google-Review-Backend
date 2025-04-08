import Controllers from "../Models/Model.js";
import { generateOrderId } from "../Helpers/Helper.js"
const planTable = new Controllers("plans");

class PlanController {

    static async getallPlan(req, res) {
        try {
            const result = await planTable.getAll();
            if (result.length > 0) {
                return res.status(200).json({
                    success: true,
                    data: result,
                    message: "plans fetched successfully",
                });
            } else {
                return res.status(404).json({ message: "No plans found." });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async createPlan(req, res) {
        try {
            const {
                plan_name,
                month_duration,
                num_establishments,
                free_trial_days,
                plan_details,
                price
            } = req.body;

            if (
                !plan_name ||
                !month_duration ||
                !num_establishments ||
                !price ||
                !free_trial_days ||
                !plan_details

            ) {
                return res.status(400).json({ error: "Required fields are missing." });
            }

            const result = await planTable.create({
                plan_name,
                month_duration,
                num_establishments,
                free_trial_days,
                plan_details,
                price,
                plan_id:generateOrderId()
            });

            return res.status(201).json({
                success: true,
                message: "Plan created successfully",
                data: result
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async editPlan(req, res) {
        try {
            const { id } = req.params;
            const {
                plan_name,
                month_duration,
                num_establishments,
                free_trial_days,
                plan_details,
                price
            } = req.body;

            if (!id) {
                return res.status(400).json({ error: "Plan ID is required." });
            }

            const updatedData = {};
            if (plan_name !== undefined) updatedData.plan_name = plan_name;
            if (month_duration !== undefined) updatedData.month_duration = month_duration;
            if (num_establishments !== undefined) updatedData.num_establishments = num_establishments;
            if (free_trial_days !== undefined) updatedData.free_trial_days = free_trial_days;
            if (plan_details !== undefined) updatedData.plan_details = plan_details;
            if (price !== undefined) updatedData.price = price;

            if (Object.keys(updatedData).length === 0) {
                return res.status(400).json({ error: "At least one field is required to update." });
            }

            const result = await planTable.update(id, updatedData);

            if (!result || result.affectedRows === 0) {
                return res.status(404).json({ error: "Plan not found or not updated." });
            }

            return res.status(200).json({
                success: true,
                message: "Plan updated successfully"
            });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deletePlan(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: "plan ID is required." });
            }
            const [result] = await planTable.delete(id)

            if (result.affectedRows > 0) {
                return res.status(200).json({
                    success: true,
                    message: "plan deleted successfully",
                })
            }

        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

}
export default PlanController;
