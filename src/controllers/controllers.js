require('express')
require('dotenv').config()
require('cookie-parser')
const db = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {generarRespuesta, contarRepeticiones, analizar} = require('../utils/utils')

const controllers = {}

controllers.index = (req,res) => {

    let token = req.cookies.auth

    let decode = jwt.decode(token, process.env.JWT_SECRET)

    console.log(decode)

    db.query(`SELECT * FROM test_1 WHERE id_usuario = ${decode};`, (err, tests) => {

        if(err) throw err

        if(tests.length == 0){
            res.redirect('/encuesta')
            return
        }

        res.render('index', {
            title   :   'HomePage',
            username:   req.cookies.name || 'Cuenta',      
            visual : tests[0].visual || 0,
            auditivo : tests[0].auditivo || 0,
            cinestesico : tests[0].cinestesico || 0,
            tipoAprendizaje: tests[0].resultado_final 
        })
    })
}

controllers.user = (req,res) => {

    const decode = jwt.decode(req.cookies.auth, process.env.JWT_SECRET)

    db.query(`SELECT * FROM test_1 WHERE id_usuario = ${decode}`, (err,usertest) => {
        // const {resultado_final, puntos} = usertest[0]
        const resultado_final = (usertest.length > 0) ? usertest[0].resultado_final : 'Encuesta pendiente'
        const puntos = (usertest.length > 0) ? usertest[0].puntos : 0
        if(err) throw err
        db.query(`SELECT * FROM usuarios WHERE id_usuario = ${decode}`, (err, user) => {
            if(err) throw err
            res.render('user', {
                title   :   `${req.cookies.name} | Perfil`,
                username:   req.cookies.name || 'Cuenta',
                name    :   user[0].nombre_usuario,
                email   :   user[0].correo_electronico,
                resultado_final,
                puntos
            })
        })
    })

}

controllers.encuestaView = (req,res) => {

    res.render('encuesta', {
        title   :   'Encuesta',
        username:   req.cookies.name || 'Cuenta'
    })
}

controllers.test1 = (req,res) => {

    const token = req.cookies.auth

    const decode = jwt.decode(token, process.env.JWT_SECRET)

    const resultado =  generarRespuesta(req.body)
    const repetidos = analizar(req.body)
    
    console.log(repetidos)
    console.log(resultado)


    db.query(`SELECT * FROM test_1 WHERE id_usuario = ${decode}`, (err,user) => {
        if(err) throw err
        if(user.length == 0){
            db.query(`INSERT INTO test_1(id_usuario, resultado_final,puntos, visual,auditivo,cinestesico) VALUE(${decode},'${resultado.resultado}',${resultado.repeticiones}, ${repetidos.visual}, ${repetidos.auditivo}, ${repetidos.cinestesico})`, (err,results) => {
                if(err) throw err
                console.log(results)
            })
        }
        if(user.length > 0){
            const updDatos = {
                id_usuario : decode,
                resultado_final : resultado.resultado,
                puntos : resultado.repeticiones,
                visual : repetidos.visual,
                auditivo : repetidos.auditivo,
                cinestesico : repetidos.cinestesico
            }
            db.query(`UPDATE test_1 SET ? WHERE id_test = ${user[0].id_test}`, [updDatos] ,(err, result) => {
                if(err) throw err
                console.log(result)
            })
        }
    })
        
}

// LINK - LOGIN
controllers.login = (req,res) => {
    db.query('SELECT * FROM usuarios', (err,results) => {
        if(err) throw err
        res.render('login', {
            title   :   '¡Inicia sesión!',
            results
        })
    })
}


controllers.auth = (req,res) => {
    const {correo_electronico, clave} = req.body

    db.query(`SELECT * FROM usuarios WHERE correo_electronico = "${correo_electronico}"`, (err,users) => {
        if(err) {
            res.redirect('/login')
            return
        }
        if(users.length == 0){
            res.redirect('/login')
            return
        }
        const hash = users[0].clave
        bcrypt.compare(clave, hash, (err,result) => {
            if(err) throw err
            if(!result){
                res.redirect('/login')
                return
            }
            const id = users[0].id_usuario
            const token = jwt.sign(id, process.env.JWT_SECRET)
            const usuario = users[0].nombre_usuario.split(" ")[0]
            res.cookie('auth', token).cookie('name',usuario).redirect('/cuenta')
            
        })
    })
}

controllers.logout = (req,res) => {
    res.clearCookie('auth')
    res.clearCookie('name')
    res.redirect('/login')
}


//LINK - REGISTRO
controllers.register = (req,res) => {
    res.render('register', {
        title   :   '¡Registrate! es gratis',
    })
}


controllers.uploadRegister = (req,res) => {
    const body = req.body
    const {clave} = body

    bcrypt.hash(clave,10, (err,hash) => {
        if(err) throw err
        body.clave = hash
        body.admin = false
        db.query(`INSERT INTO usuarios SET ? `, [body], (Err, result) => {
            if(Err) {
                console.error(err)
                res.redirect('/login')
                return
            }
            console.log(result)
            res.redirect('/login')
        })
    })
}



module.exports = controllers