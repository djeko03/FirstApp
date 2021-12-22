const User = require('./authSchema/User')
const Role = require('./authSchema/Role')
const Token = require('./authSchema/Token')
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')




class authController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {username, password, phone, name, lastname} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            } 
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, roles: userRole.value, phone, name, lastname})
            await user.save()
            return res.json({message:'Пользователь успешно зарегистрирован'})
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const existToken = await Token.findOne({userID: user._id})
            if (existToken) {
                console.log('Token exists');
            } else {
                const token = new Token ({userID: user._id})
                await token.save()
            }

            res.cookie('token', `${user._id}`, { expires: new Date(Date.now() + 1800000), secure: true, })
            console.log(res.getHeader('Set-Cookie'));
            return res.end()
        } catch (e) {    
            console.log(e);
            res.status(400).json({message: 'Login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const token = req.cookies.token
        if(!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
            const users = await User.find({_id: token})
            return res.json(users)
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController()