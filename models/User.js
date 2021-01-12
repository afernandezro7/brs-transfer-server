const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

userSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object
})

module.exports = model('User', userSchema);
