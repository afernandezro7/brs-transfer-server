const { Schema, model } = require('mongoose');

const linkSchema = new Schema({
    url:{
        type: String,       
        required: true
    },
    name: {
        type: String,
        required: true
    },
    original_name: {
        type: String,
        required: true,
    },
    downloads: {
        type: Number,
        default: 1
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    password: {
        type: String,
        default: null
    },
    creation_date:{
        type: Date,
        default: Date.now()
    }
    
})

linkSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object
})

module.exports = model('Link', linkSchema);
