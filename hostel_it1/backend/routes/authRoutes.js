import express from "express";
import bcrypt from "bcrypt";
import pool from "../db.js"
import jwt from "jsonwebtoken"
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
const router = express.Router();

router.post("/register", async(req, res) => {
    try{
        const{
            name, email, password, role 
        } = req.body

        const existingUser = await pool.query(
            `SELECT * FROM users WHERE email = $1`, [email]
        )
        if(existingUser.rows.length>0) {
            return res.status(400).json({
                message: "Email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await pool.query(
            `INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, name, email, role` ,
            [name, email, hashedPassword, role]
        )

        res.status(200).json(
            result.rows[0]
        )        

        }
        catch(error){
            console.error(error)
            res.status(500).json({
                message: "Registration failed"
            })
        }



    }



)

router.post("/login", async(req, res) => {
    try {
        const {email, password} = req.body;
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1`, [email]
        );
        if(result.rows.length===0){
            return res.status(400).json({
                message: "User not found"
            })
        }
        const user = result.rows[0]
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role

        },
        process.env.JWT_SECRET,{
            expiresIn: "1d"
        }

        )

        res.json({
            token, user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
        
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message: "Login failed"
        })
    }

})


router.get("/me", authMiddleware, async(req, res)=>{
    res.json({
        message: "Protected route",
        user: req.user
    })
})

router.get("/admin-test", authMiddleware, roleMiddleware("admin"), (req,res) => {
    res.json({
        message: "welcome admin"
    })
})













export default router;