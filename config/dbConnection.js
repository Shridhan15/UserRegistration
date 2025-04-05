const mongoose = require("mongoose");
//it wont work on college wift, use mobile hotspote or windscribe vpn
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected: ", connect.connection.host, connect.connection.name)
    } catch (err) {
        console.log("Error is", err);
        process.exit(1)
    }
}

module.exports = connectDb;