const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server Is Up & Running');
});


module.exports =router;