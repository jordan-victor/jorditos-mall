const express = require('express')
const userController = express.Router()
const connection = require('../database/database')
const User = connection.User

const bcrypt = require('bcryptjs')
const { where } = require('sequelize')
const { raw } = require('body-parser')
//praticando sessões, apagar depois
const session = require('express-session')
userController.use(session({
    secret:"xyzzxy1020304050",
    cookie:{maxAge:60000}
}))

userController.get('/session',  (req, res)=>{
    req.session.nome = "Jordan"
    req.session.email = "jordao@gmail.com"
    res.send('Sessão criada')
})

userController.get('/ler', (req, res)=>{
    res.json({
        nome:req.session.nome,
        email: req.session.email
    })
})


userController.get('/session', (req, res)=>{

})





userController.get('/Showlogin',(req,res)=>{
    res.render('./login/login')
})





userController.get('/showCadastro',(req,res)=>{
    res.render('./login/cadastro')
})

userController.post("/createUser", (req, res)=>{
    let user = req.body.user
    let email = req.body.email
    let password = req.body.password

    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)

    User.findOne({raw:true, where:{email:email}}).then(emailRepetido=>{
        if(emailRepetido == undefined){
            User.create({
                usuario:user,
                senha:hash,
                email:email
            }).then(()=>{
                res.redirect('/Showlogin')
            }).catch(error=>{
                res.redirect('/')
            })

        }
        else{
            res.redirect('/')
        }
    })
})


module.exports = userController