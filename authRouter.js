const Router = require('express')
const authController = require('./authController')
const {check} = require('express-validator')



const authRouter = new Router()


authRouter.post('/registration', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль пользователя не может быть короче 4 и длиннее 10 символов').isLength({min: 4, max: 10})
], authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/users', authController.getUsers)

module.exports = authRouter