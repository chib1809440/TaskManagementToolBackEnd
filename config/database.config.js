require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;
const connection = mongoose.connect(url)

connection.then(() => {
    console.log("✔ Database Connected");
}).catch(err => {
    console.log("✘ MONGODB ERROR", err.message);
})

module.exports = connection