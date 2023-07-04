const express = require('express')
const router = express.Router()
const controllers = require('../controllers/controllers')
const controllersAdmin = require('../controllers/controllers_admin')
const {verifyAuth, verifyAdmin} = require('../middleware/middleware')


router.get('/', verifyAuth, controllers.index)
router.get('/cuenta', verifyAuth, controllers.user)
router.get('/encuesta', verifyAuth, controllers.encuestaView)
router.post('/enviar', verifyAuth, controllers.test1)

router.get('/login', controllers.login)
router.post('/auth', controllers.auth)
router.post('/logout', controllers.logout)

router.get('/register', controllers.register)
router.post('/register', controllers.uploadRegister)


// NOTE - ADMIN RUTAS
router.get('/usuarios', verifyAdmin, controllersAdmin.index)
router.get('/usuario/:id_usuario', verifyAdmin, controllersAdmin.user)
router.get('/nuevo-admin', verifyAdmin, controllersAdmin.register)
router.post('/nuevo-admin', verifyAdmin, controllersAdmin.newAdmin)


module.exports = router