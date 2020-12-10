const express = require('express')
const router  = express.Router()
const User = require('../models/User')

const profileImgUpload = require('../configs/cloudinary-setup')


/* getting user info */
router.get('/user-info', (req, res) => {
    const { userId } = req.body

    User.findById({_id: userId})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})
  



module.exports = router;
