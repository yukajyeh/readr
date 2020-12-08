const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const bookshelfSchema = new Schema({

    favBook:{
        type: Schema.Types.Mixed,
        required: true
    },

    childBook:{
        type: Schema.Types.Mixed,
        required: true
    },

    weaponBook:{
        type: Schema.Types.Mixed,
        required: true
    },

    pleasureBook:{
        type: Schema.Types.Mixed,
        required: true
    },

    showoffBook:{
        type: Schema.Types.Mixed,
        required: true
    },

    nextBook:{
        type: Schema.Types.Mixed,
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