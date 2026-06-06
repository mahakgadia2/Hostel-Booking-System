import express from "express"
import pool from "../db.js"
import authMiddleware from "../middleware/authMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router()

router.post("/", authMiddleware, roleMiddleware("student"), async(req, res) =>{
    try{
        const {room_id} = req.body;
        const user_id = req.user.id;
        const existing = await pool.query(
            `SELECT * FROM booking_requests WHERE room_id = $1 AND status = 'approved'`, [room_id]
        )
        if(existing.rows.length>0){
            return res.status(400).json({
                message: "Room is already booked"
            })
        }

        const result = await pool.query(
            `INSERT INTO booking_requests (user_id, room_id) VALUES ($1, $2) RETURNING *`, [user_id, room_id]
        )
        res.status(201).json(result.rows[0])


    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Booking failed"
        })
    }
})

router.get("/my-bookings", authMiddleware, async(req,res) => {
    try {
        const result = await pool.query(
            `SELECT br.id, br.status, br.created_at, r.hostel, r.floor_no, r.room_no FROM booking_requests br JOIN rooms r ON br.room_id = r.id
            WHERE br.user_id = $1 ORDER BY br.created_at DESC`, [req.user.id]
        )
        res.json(result.rows)

    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Failed to fetch bookings"
        })
    }
} )

router.get("/all", authMiddleware, roleMiddleware("admin"), async(req, res) => {
    try {
        const result = await pool.query(
            `SELECT br.id, br.status, br.created_at, u.name, u.email, r.hostel, r.floor_no, r.room_no
             FROM booking_requests br JOIN users u ON br.user_id = u.id JOIN rooms r ON br.room_id = r.id
             ORDER BY br.created_at DESC`
        )
        res.json(result.rows)
    }
    catch(error){
        res.status(500).json({
            message: "Failed to fetch bookings"
        })
    }
})

router.patch("/:id/approve", authMiddleware, roleMiddleware("admin"), async(req, res) => {
    try {
        const result = await pool.query(
            `UPDATE booking_requests SET status = 'approved' WHERE id = $1 RETURNING *`, [req.params.id]
        )
        res.json(result.rows[0])
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Approval failed"
        })
    }
})

router.patch("/:id/reject", authMiddleware, roleMiddleware("admin"), async(req, res) => {
    try {
        const result = await pool.query(
            `UPDATE booking_requests SET status = 'rejected' WHERE id = $1 RETURNING *`, [req.params.id]

        )
        res.json(result.rows[0])
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Rejection failed"
        })
    }

})

router.get("/approved-rooms", async(req,res) => {
    try {
        const result = await pool.query(
            `SELECT room_id  FROM booking_requests WHERE status = 'approved'`
        )
        res.json(result.rows)

    

    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: "Failed to fetch approved rooms"
        })
    }
})
export default router





