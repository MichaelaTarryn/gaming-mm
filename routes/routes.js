const express = require('express');
const router = express.Router();
const path = require('path');

// Home page
router.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views', 'index.html'));
})
router.post("/forgot-password", (req, res) => {
    res.status(401).json({
        msg: "You forgot your password"
    })
});

module.exports = router;