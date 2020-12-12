const express = require('express')
const router  = express.Router()
const Bookshelf = require('../models/Bookshelf-model')
const User = require('../models/User')


router.get('/bookshelf/:id', (req, res) => {
    console.log(req.params.id)

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
        
        return User.findByIdAndUpdate( {_id: currentUser._id }, { bookShelf: bookshelf._id}, {new: true} )
    })
    .then(response => {
        req.session.user = response
        res.status(200).json(response)
    })
    .catch((err)=>console.log('error',err))
})

//display a random bookshelf on swipe page
router.get('/random-bookshelf', (req, res) => {
    const currentUser = req.session.user

    Bookshelf.findOne(
        { $and: [
        { owner: { $nin: currentUser._id } }, 
        { _id: { $nin: currentUser.likes  } },
        { _id: { $nin: currentUser.dislikes } }, 
        ]}
    )
    .then(response => {
            res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    })
})


//update swipe likes
router.post('/update-likes', (req, res) => {
    const { liked } = req.body
    const currentUser = req.session.user
    
    User.findByIdAndUpdate( {_id: currentUser._id }, {$push: {likes: liked}}, {new: true} )
    .then(activeUser => {
        const currentUserUpdated = activeUser
        
        User.findOne( { bookShelf: liked })
        .then(targetBookshelf => {
            const likedFromTarget = targetBookshelf.likes
            
            if(likedFromTarget.includes(currentUser.bookShelf)) {
                User.findByIdAndUpdate({ _id: targetBookshelf._id}, {$push: {matches: currentUser.bookShelf}}, {new: true})
                .then(targetBookshelfUpdated => {
                    User.findByIdAndUpdate({ _id: currentUser._id}, {$push: {matches: targetBookshelfUpdated.bookShelf}}, {new: true})
                    .then(activeUser => {
                        req.session.user = activeUser
                        res.status(200).json(activeUser)
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            } else {
                req.session.user = currentUserUpdated
                return res.status(200).json(currentUserUpdated)
            }
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})

router.post('/update-dislikes', (req, res) => {
    const { disliked } = req.body
    const currentUser = req.session.user
    
    User.findByIdAndUpdate( {_id: currentUser._id }, {$push: {dislikes: disliked}}, {new: true} )
    .then(response => {
        req.session.user = response
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})

//display matched bookshelf
router.get('/matches', (req, res) => {
    const currentUser = req.session.user

    User.findById({_id: currentUser._id})
    .then(response => {
        console.log('response back-end', response)
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }) 
})

// router.post('/matchedShelf', (req, res) => {
//     const {matches} = req.body

//     console.log('matches', matches)
// })

module.exports = router
