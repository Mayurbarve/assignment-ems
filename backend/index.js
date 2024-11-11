import app from './src/app.js'
import connectDB from './src/db/dbConnect.js'
import { config } from 'dotenv'


const port = process.env.PORT || 3000

connectDB().then(() => {
    console.log('database connected successfully')
}).catch((error) => {
    console.log(error)
})



app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})
