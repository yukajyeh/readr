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
        return User.findByIdAndUpdate( {_id: currentUser._id }, {$set: { bookShelf: bookshelf._id}} )
    })

    .then(user => {
        return Bookshelf.find( {owner:user._id} )
    })
})

//display a random bookshelf on swipe page
router.get('/random-bookshelf', (req, res) => {
    
    const currentUser = req.session.user
    console.log(currentUser)

  

    Bookshelf.count().exec(function (err, count) {
        // Get a random entry
        const random = Math.floor(Math.random() * (count-1)) 

        console.log('count', count)
        console.log('random', random)
      
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
    console.log('test', req.body)
    const { likes, dislikes } = req.body
    const currentUser = req.session.user
    
    User.findByIdAndUpdate( {_id: currentUser._id }, {$push: {likes: likes, dislikes: dislikes} } )
    .then(response => {
        res.status(200).json(response)
    })
    
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
    
})


module.exports = router
