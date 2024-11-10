import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ems")
            .then(() => console.log('MongoDB connected'))
    }
    catch (err) {
        console.error('Mongo Connection error:', err)
    }
}

export default connectToDatabase