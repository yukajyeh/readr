const mongoose = require ('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    profileName: {
        type:String,
        required:true,
    }
    profileImage:{
        type: String,
    },

    gender:{
        type: String,
        enum:["male","female"]
    },

    contactInfo:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model("User", userSchema)