import mongoose from "mongoose"
import 'dotenv/config'

const connectDB = async()=>{



	try {
		const instance = await mongoose.connect(
			`${process.env.MONGODB_URL}`
		)
		return instance	
	} catch (error) {
		
		console.log(error)
		process.exit(1)	
	}


}

export default connectDB
