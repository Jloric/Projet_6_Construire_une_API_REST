const mongoose = require('mongoose');


const saucesSchema = mongoose.Schema({
    userID: { type:String, required:true},
    name:{type:String, required:true},
    manufacturer:{type:String, required:true},
    description:{type:String, required:true},
    mainPepper:{type:String, required:true},
    imageURL:{type:String, required:true},
    heat:{type:Number, required:true},
    likes:{type:Number, required:true},
    dislikes:{type:Number, required:true},
    usersLiked:{type:String, required:true},
    userDisliked:{type:String, required:true}
});

//saucesSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauces', saucesSchema);
