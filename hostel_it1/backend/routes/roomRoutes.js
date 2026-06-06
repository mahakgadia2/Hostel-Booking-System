import express from "express"
import pool from "../db.js"
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router()

router.get("/", async(req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM rooms ORDER BY hostel, floor_no, room_no`
        )
        res.json(result.rows)
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Failed to fetch rooms"
        })
    }
})

export default router