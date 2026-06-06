export default function roleMiddleware(...allowedRoles){
    return(req,res,next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(400).json({
                message: "Access denied"
            })
        }
        next()

    }

}