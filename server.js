const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})

const app = require('./app')
const DB = process.env.DATABASE.replace('<PASS>',process.env.DATABASE_PWD)

mongoose.connect(DB,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
}).then(()=>{console.log("Database Connected Successfully")})


const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`App running on PORT ${PORT}`)
})