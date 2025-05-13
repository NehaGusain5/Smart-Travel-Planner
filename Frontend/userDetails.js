const mongoose= require('mongoose');
const userDetailsSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {type:String, unique: true},
    password: String,
},
{
    collection: 'userdetails'
}
);

mongoose.model("UserInfo",userDetailsSchema);
//module.exports = User; 