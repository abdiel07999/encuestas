require('express')
require('dotenv').config()
require('cookie-parser')
const jwt = require('jsonwebtoken')
const db = require('../config/db')
const middlewares = {}

middlewares.verifyAuth = (req,res,next) => {

    const token = req.cookies.auth
    if(token == undefined){
        res.redirect('/login')
        return
    }

    const decode = jwt.decode(token, process.env.JWT_SECRET)

    db.query(`SELECT * FROM usuarios WHERE id_usuario = "${decode}"`, (err,user) => {
        if(err) throw err
        const isAdmin = user[0].admin.readInt8(0) === 1

        console.log(isAdmin)
        if(user.length == 0){
            res.redirect('/login')
            return
        }
        if(isAdmin){
            res.redirect('/usuarios')
        }else{
            next()
        }
    })
}

middlewares.verifyAdmin = (req,res,next) => {
    const token = req.cookies.auth
    if(token == undefined){
        res.redirect('/login')
        return
    }

    const decode = jwt.decode(token, process.env.JWT_SECRET)
    db.query(`SELECT * FROM usuarios WHERE id_usuario = "${decode}"`, (err,user) => {
        if(err) throw err
        if(user.length == 0){
            res.redirect('/login')
            return
        }

        const isAdmin = user[0].admin.readInt8(0) === 1

        console.log(isAdmin)

        if(isAdmin){
            next()
        }else{
            res.redirect('/')
        }
    })
}


module.exports = middlewares