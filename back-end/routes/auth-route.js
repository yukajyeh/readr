const express = require('express')
const router  = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const profileImgUpload = require('../configs/cloudinary-setup')


/* User Signup */
router.post('/signup', profileImgUpload.single("profileImage"), async(req, res) => {
    const { profileImage, username, password, profileName, gender, matchPreference, contactInfo } = req.body
    
    if(!username || !password || !profileName || !gender || !matchPreference || !contactInfo){
        res.status(400).json({message:"Please fill in all the fields"})
        return
    }
    
    try {
        const userExists = await User.findOne( {username} )
        if(userExists){
            res.status(401).json({message:"This username already exists. Pick another name"})
            return
        }
        
        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password,salt)

        
        const user = await User.create({ 
            username: username, 
            password: hashPass, 
            profileName: profileName, 
            gender: gender, 
            matchPreference: matchPreference, 
            contactInfo: contactInfo, 
            profileImage: profileImage,
            likes:[],
            dislikes:[]
        })

        req.session.user = user 
        res.status(200).json(user)
        return
    }

    catch(err){
        console.log(err)
        res.status(500).json({message:"Something went wrong "})
    }
})


/* Login */
router.post('/login', async(req, res) => {

    const { username, password } = req.body

    if(!username || !password){
      res.status(400).json({ message: "Please fill in the information"})
      return
    } 

    try {
      const user = await User.findOne({ username })

      if(user){
        const passwordCorrect = await bcrypt.compare(password, user.password)
        if(passwordCorrect){
          req.session.user = user
          res.status(200).json(user)
        } else {
          res.status(400).json({ message: 'Password Incorrect'})
        }
      } 
      else {
        res.status(400).json({ message: 'User Does Not Exist'})
      } 
    } catch(err){
        console.log(err)
        res.status(500).json({ message: "Something is Wrong"})
      }

})

/* LoggedIn */
router.get('/loggedin', (req, res) => {
    console.log('loggedin', req.session.user)

    if(req.session.user){
      res.status(200).json(req.session.user)
    } else {
      res.status(400).json({ message: 'No user in session' })
    }
})
  

/* Logout */ 
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.status(200).json({ message: 'You have logged out' })
})
  
module.exports = router;
