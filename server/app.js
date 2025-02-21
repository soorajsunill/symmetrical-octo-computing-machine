import express from 'express'
import { configDotenv } from 'dotenv';
import cors from 'cors'
import {corsOptions} from './config/corsConfig.js'
import session from 'express-session'
import fileUpload from 'express-fileupload';
configDotenv()
import './config/db.js'
import adminRouter from './routes/adminRoutes.js';

const app = express()
const PORT = process.env.PORT

app.use(fileUpload())
app.use(express.static("public"))
app.use(cors(corsOptions))
app.use(express.json())
app.use(session({
    secret : "arandomkey",
    resave: false,
    saveUninitialized: false,
    cookie : {maxAge: 60000*60*24}
}))

app.use("/admin", adminRouter)


app.listen(PORT, ()=>{
    console.log(`connected to http://localhost:${PORT}`);
})