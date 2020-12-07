const express = require('express')
const router  = express.Router()
const Bookshelf = require('../models/Bookshelf')
const User = require('../models/User')


router.get('/bookshelf/:id', (req, res) => {
    console.log(req.params.id)

    Bookshelf.findById({_id: req.params.id})
    .then(response => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})

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
         User.findByIdAndUpdate( {_id: currentUser._id }, {$set: { bookShelf: bookshelf._id}} )
         return bookshelf
    })
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})


module.exports = router
