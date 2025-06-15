const mongoose = require("mongoose");
const  Schema = mongoose.Schema
const  passportLocalMongoose = require("passport-local-mongoose")//(plm)

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    }
    //username and password automatically assigned by the plm
})

userSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("User",userSchema)

