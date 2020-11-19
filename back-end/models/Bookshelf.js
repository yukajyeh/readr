const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const bookshelfSchema = new Schema({

    favBook:{
        type: String,
        required: true
    },

    childBook:{
        type: String,
        required: true
    },

    weaponBook:{
        type: String,
        required: true
    },

    pleasureBook:{
        type: String,
        required: true
    },

    showoffBook:{
        type: String,
        required: true
    },

    nextBook:{
        type: String,
        required: true
    },

    owner:[{
        type: Schema.Types.ObjectId,
        "ref": "User",
    }]
},

{   timestamps: 
    {createdAt: 'created_at', updatedAt: 'updated_at'}
}
)

module.exports = mongoose.model('BookShelf', bookshelfSchema)