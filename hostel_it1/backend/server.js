import express from "express"
import cors from "cors"
import pool from "./db.js"
import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
const app = express()

app.use(express.json())
app.use(cors())
app.use("/auth", authRoutes)
app.use("/rooms", roomRoutes)
app.use("/bookings", bookingRoutes)



app.get("/", async(req, res) => {
    try {
        const result = await pool.query(
            "SELECT NOW()"
        )
        res.json(result.rows)
    }
    catch(err){
        console.error(err)
    }
})

app.listen(5000, ()=> {
    console.log("server running on port 5000")
})
