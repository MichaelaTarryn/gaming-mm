require('dotenv').config();
const express = require('express');
const db = require('./config/dbconn');
const router = require('./routes/routes');
const path = require('path')
// express app
const app = express();
// Router

const port = parseInt(process.env.PORT) || 4000;
app.use(router, express.json(), express.urlencoded({
    extended: true
}));
app.use(express.static('views'))

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})
