const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

require('dotenv').config();
app.use(cors());
app.use(cookieParser());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options("*", cors({ origin: 'http://localhost:5000', optionsSuccessStatus: 200 }));

//Router config
const appRouteV1 = require('./src/v1/routes/appRoutes')

require('./config/database.config')
console.log('✔ Starting Application...');
console.log(`✔ Port ${process.env.port}`);

app.use('/api/v1/app', appRouteV1)

app.listen(process.env.port, (err) => {
    if (err) {
        console.log("✘ Application failed to start")
        console.error("✘", err.message)
    } else {
        console.log("✔ Application started at http://localhost:" + process.env.port)
    }
})
