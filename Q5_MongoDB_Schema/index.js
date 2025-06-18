require("dotenv").config();

const connectDB = require("./database/config");

const app = require("./app");

const port = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR OCCURS: ", error);
        throw error;
    })
    app.listen(port, ()=> {
        console.log(`SERVER STARTS AT PORT : ${port}`);
    })
})
.catch((error) => {
    console.log("MONGODB CONNECTION FAILED ", error);
})