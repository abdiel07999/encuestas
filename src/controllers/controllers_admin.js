require('express')
require('dotenv').config()
const db = require('../config/db')
const bcrypt = require('bcrypt')

const controllers = {}

controllers.index = (req,res) => {
    const username = req.cookies.name
    db.query('SELECT * FROM users_view_complete WHERE admin = false', (err,users) => {

        // console.table(users)

        if(err) throw err
        res.render('admin/users', {
            title : "Usuarios",
            username,
            users
        })
    })
}

controllers.user = (req,res) => {
    const {id_usuario} = req.params
    const username = req.cookies.name
    db.query('SELECT * FROM users_view_complete WHERE id_usuario = ?', [id_usuario], (err,users) => {
        if(err) throw err
        db.query('SELECT visual,auditivo,cinestesico FROM test_1 WHERE id_usuario = ?', [id_usuario], (err,tests1) => {
            if(err) throw err
            const user = users[0]
            const {visual,auditivo,cinestesico} = tests1[0]
            res.render('admin/user', {
                title : user.nombre_usuario,
                username,
                user,
                data : {
                    visual,
                    cinestesico,
                    auditivo,
                }
            })
        })
    })
}

controllers.register = (req,res) => {
    res.render('admin/newAdmin', {
        title   :   'Nuevo Admin',
        username: req.cookies.name
    })
}

controllers.newAdmin = (req,res) => {
    const body = req.body
    const {clave} = body

    bcrypt.hash(clave,10, (err,hash) => {
        if(err) throw err
        body.clave = hash
        body.admin = true
        db.query(`INSERT INTO usuarios SET ? `, [body], (Err, result) => {
            if(Err) {
                console.error(err)
                res.redirect('/nuevo-admin')
                return
            }
            console.log(result)
            res.redirect('/usuarios')
        })
    })
}


module.exports = controllers