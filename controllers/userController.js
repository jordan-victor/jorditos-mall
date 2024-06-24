const express = require('express')
const userController = express.Router()
const connection = require('../database/database')
const User = connection.User

const bcrypt = require('bcryptjs')

userController.post("/createUser", (req, res)=>{
    let user = req.body.user
    let email = req.body.email
    let password = req.body.password

    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
})


module.exports = userController