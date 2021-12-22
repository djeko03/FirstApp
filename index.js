const path = require('path');
const express = require('express')
const mongoose = require('mongoose')
const router = require('./router.js')
const authRouter = require('./authRouter')
const cookieParser = require('cookie-parser')
const User = require('./authSchema/User')



const app = express();
const PORT = 5000;
const DB_URL = `mongodb+srv://user:user@cluster0.x8pli.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(cookieParser('secret key'))
app.use('/api', router)
app.use('/auth', authRouter)


app.get('/api', (req, res) => {
    res.sendFile(`${__dirname}/public/addPerson.html`);
});




app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`).json({token});
    res.end()
});
app.get('/auth/login', (req, res) => {
    res.sendFile(`${__dirname}/public/login.html`);
});
app.get('/auth/registration', (req, res) => {
    res.sendFile(`${__dirname}/public/registration.html`);
});

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('Server working on PORT ' + PORT))
    } catch(e) {
        console.log(e);
    }
}

startApp()