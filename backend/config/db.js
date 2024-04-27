import mongoose from "mongoose";
//sudo systemctl start mongod
const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Estore');

        console.log(`Successfully connected to mongodb :)`)
    } catch (error) {
        console.error(`Error : ${error.message}`)
        process.exit(1)
    }
}

export default connectDb
