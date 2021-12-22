const User = require('../authSchema/User')

module.exports = async function(req, res, next) {
    if(req.method === "OPTIONS"){
        next()
    }

    try{
        const token = req.cookies.token
        if(!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const user =  await User.findOne({_id: token})
        const roles = user.roles
        if(roles !== "ADMIN") {
            return res.status(403).json({message: "У вас нет доступа"})
        }
        next()
    } 
    catch(e) {
        console.log(e);
        res.status(403).json({message: "Пользователь не авторизован"})
    }
}