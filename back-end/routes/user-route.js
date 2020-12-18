const express = require('express')
const router  = express.Router()
const User = require('../models/User')
const profileImgUpload = require('../configs/cloudinary-setup')


/* getting user info by id user */
router.get('/user-info/:id', (req, res) => {
    User.findById({_id: req.params.id})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})

/* get user info by id bookshelf*/
router.get('/owner/:id', (req, res) => {

    User.findOne({ bookShelf: req.params.id })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})
  



module.exports = router;
