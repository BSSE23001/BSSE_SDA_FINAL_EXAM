const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectionResponse = await mongoose.connect(`${process.env.MONGODB_URI}/inventory_system`);
        console.log(`MONGODB CONNECTED !`);
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR ", error);
        process.exit(1);
    }
}

module.exports = connectDB;

