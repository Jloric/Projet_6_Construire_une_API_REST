const mongoose = require('mongoose');


const saucesSchema = mongoose.Schema({
    userId: { type:String, required:true},
    name:{type:String, required:true},
    manufacturer:{type:String, required:true},
    description:{type:String, required:true},
    mainPepper:{type:String, required:true},
    imageURL:{type:String, required:true},
    heat:{type:Number, required:true},
    likes:{type:Number},
    dislikes:{type:Number},
    usersLiked:{type:String},
    userDisliked:{type:String}
});

//saucesSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauces', saucesSchema);
