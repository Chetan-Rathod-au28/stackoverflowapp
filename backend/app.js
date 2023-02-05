import express from "express"
import { APP_PORT } from "./config/index.js"
const app = express()

app.use(express.json())
//route import
import product from "./routes/productRoute.js"


app.use("/api/v1",product)

app.listen(APP_PORT,()=>{
    console.log(`App is listening at post ${APP_PORT} `)
})

export default app;