require('./config/db')
const express = require('express')
const router = require('./routes/routes')
const cookieParser = require('cookie-parser')
const app = express()


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(`${__dirname}/public`))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')

const PORT = process.env.PORT || 3000

app.use(router)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))