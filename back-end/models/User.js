const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type: String,
        required: true
    },

    profileName: {
        type:String,
        required:true
    },

    profileImage:{
        type: String
    },

    gender:{
        type: String,
        enum:["male","female","unicorn"]
    },

    matchPreference:{
        type: String,
        enum:["male","female","unicorn","all"]
    },

    contactInfo:{
        type: String,
        required:true
    },

    bookShelf: {
        type: String,
        "ref": "bookShelf",
    },

    likes: {
        type: Schema.Types.Mixed
    },

    dislikes:{
        type: Schema.Types.Mixed
    }
},

{   timestamps: 
        {createdAt: 'created_at', updatedAt: 'updated_at'}
}

)

module.exports = mongoose.model("User", userSchema);