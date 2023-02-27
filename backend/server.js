import express from "express"
import app from "./app.js"
import connectDataBase from "./config/database.js"
import cors from 'cors'


//connecting to databae
connectDataBase();


//
// static resources
// app.use('/upload',express.static(path.join(__dirname,'./../uploads')))
// app.use(express.static(path.join(__dirname,'/../frontend/build')))

app.get('*',(req,res)=> {
    try{
        res.sendFile(path.join('${__dirname}/../frontend/build/index.html'))
    } catch (e) {
        res.send('Oops')
    }
})
//cors
app.use(cors())
