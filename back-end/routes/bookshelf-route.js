const express = require('express')
const router  = express.Router()
const Bookshelf = require('../models/Bookshelf-model')
const User = require('../models/User')


router.get('/bookshelf/:id', (req, res) => {

    Bookshelf.findById({_id: req.params.id})
    .then(response => {
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

    const newBookshelfModel = new Bookshelf({
        favBook: favBook, 
        childBook: childBook, 
        weaponBook: weaponBook, 
        pleasureBook: pleasureBook, 
        showoffBook: showoffBook, 
        nextBook: nextBook,
        owner: currentUser._id
    })
    
    newBookshelfModel.save()
    .then(bookshelf => {
        console.log('bookshelf in route file', bookshelf)
        return User.findByIdAndUpdate( {_id: currentUser._id }, { bookShelf: bookshelf._id}, {new: true} )
    })
    .then(response => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch((err)=>console.log('error',err))
})

//display a random bookshelf on swipe page
router.get('/random-bookshelf', (req, res) => {
    
    const currentUser = req.session.user

    Bookshelf.count().exec(function (err, count) {
        // Get a random entry
        const random = Math.floor(Math.random() * (count-1)) 
      
        // Again query all bookshelves but only fetch one offset by our random #
        Bookshelf.findOne(({ $and: [
            { owner: { $ne: currentUser._id } }, 
            { _id: { $nin: currentUser.likes } },
            { _id: { $nin: currentUser.dislikes } },
        ]})).skip(random).exec(
            function (err, result) {
                res.status(200).json(result)
            }
        )
    
    })
})


//update swipe options
router.post('/likes-dislikes', (req, res) => {
    console.log('route file req body:', req.body)
    const { disliked, liked } = req.body
    const currentUser = req.session.user
    
    User.findByIdAndUpdate( {_id: currentUser._id }, {$push: {likes: liked, dislikes: disliked}}, {new: true} )
    .then(response => {
        console.log(response)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
    
})


module.exports = router
