require('dotenv').config();
const express = require('express');
const db = require('./config/dbconn');
const router = require('./routes/routes');
// express app
const app = express();
// Router

const port = parseInt(process.env.PORT) || 4000;
app.use(router, express.json(), express.urlencoded({
    extended: true
}));
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
