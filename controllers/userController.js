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
    cookie:{maxAge:60000000}
}))



//IMPORTANDO O MIDDLEWARE DE AUTENTICAÇÃO DO USUÁRIO
//const userAuth = require('../middlewares/userAuth')




//ROTAS DE CRIAÇÃO DE USUÁRIO
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





//ROTAS DE AUTENTICAÇÃO/LOGIN DO USUÁRIO
userController.get('/Showlogin',(req,res)=>{
    res.render('./login/login')
})

userController.post('/authenticate', (req, res)=>{
    let user = req.body.user
    let password = req.body.password
    
    User.findOne({where:{usuario:user}}).then(user=>{
        if(user != undefined){
            let correct = bcrypt.compareSync(password, user.senha)
            if(correct){
                req.session.user = {
                    usuario: user.usuario,
                    email: user.email
                }
                res.redirect('/')
            }
            else{
                res.redirect('/Showlogin')
            }
        }
        else{
            res.redirect('/Showlogin')
        }
    })
})

/*
userController.get('/teste', (req, res)=>{ 
    if(req.session.user != undefined){
        res.send('funciona')    
    }
    else{
        res.redirect('/')
    }
})
*/

module.exports = userController