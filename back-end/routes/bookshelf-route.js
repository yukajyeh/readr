const express = require('express')
const router  = express.Router()
const Bookshelf = require('../models/Bookshelf')
const User = require('../models/User')


router.post('/pick-your-books', async(req , res) => {
    const { favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook } = req.body
    const currentUser = req.session.currentUser
    console.log('current:', currentUser)
    console.log(req.body)

    const newBookshelf = new Bookshelf(
    {
        favBook, 
        childBook, 
        weaponBook, 
        pleasureBook, 
        showoffBook, 
        nextBook
        owner: currentUser._id
    })

    newBookshelf.save()
        .then(bookshelf => {
            return User.findByIdAndUpdate({_id:req.session.currentUser._id },{$push: { bookShelf: bookshelf._id}} )
        })
        .then(
            res.status(200).json(bookshelf)
        )
        .catch(err){
            console.log(err)
            res.status(500).json({message:"Something went wrong "})
        }
})


module.exports = router
