const express = require('express')
const router  = express.Router()
const Bookshelf = require('../models/Bookshelf')
const User = require('../models/User')


router.post('/pick-my-books', (req , res) => {
    const { favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook } = req.body
    const currentUser = req.session.user
    // console.log('current:', currentUser)
    // console.log(req.body)


    const newBookshelf = new Bookshelf({
        favBook: favBook, 
        childBook: childBook, 
        weaponBook: weaponBook, 
        pleasureBook: pleasureBook, 
        showoffBook: showoffBook, 
        nextBook: nextBook,
        owner: currentUser._id
    })
    
    newBookshelf.save()
    .then(bookshelf => {
        return User.findByIdAndUpdate( {_id: currentUser._id }, {$push: { bookShelf: bookshelf._id}} )
    })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})

router.post('/pick-my-books', (req, res) => {
    const { bookshelfId } = req.body
    console.log(req.body)

    Bookshelf.findById(bookshelfId)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})



module.exports = router
