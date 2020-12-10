const express = require('express')
const router  = express.Router()
const profileImgUpload = require("../configs/cloudinary-setup")

router.post('/upload', profileImgUpload.single('profileImage'), (req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
    }
    console.log('req file path', req.file.path)
    res.status(200).json(req.file.path);
  })


module.exports = router