const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SCERET="heribdjbcksck3446571()bjkvkqwlbbfvcalskn54679674890?[]$#iop89"
const mongoUrl= "mongodb+srv://daa:daa123@cluster0.mafrhwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose
.connect(mongoUrl,{
    // { useNewUrlParser: true, 
    // useUnifiedTopology: true 
    })
    .then(() =>{
        console.log('Connected to MongoDB');
})
.catch((e)=> console.log(e));
const userDetails = require("./userDetails.js");
require("./userDetails")

const User = mongoose.model("UserInfo");
//const User = require("./userDetails.js");


app.post("/register",async(request,result)=>{
    const {firstname,lastname,email,password}=request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const oldUser=await User.findOne({email});
        if(oldUser){
            return result.json({message:"User already exists"});
        }
        await User.create({
            firstname,
            lastname,
            email,
            password:hashedPassword,
            });
            result.json({ message: "User created" });
    } catch(error){
        result.send({message:"Error"});
    }
})
app.post("/login-user", async (request, result) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });
    if (!user) {
        return result.status(404).json({ message: "User not found" }); // Correct status
    }

    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email:user.email }, JWT_SCERET, { expiresIn: "1h" }); // Set expiration

        return result.status(200).json({
            message: "User logged in",
            token, // Send token correctly
        });
    }
})
app.post("/userData",async(request,result)=>{
    const {token}=request.body;
    try {
        const user=jwt.verify(token,JWT_SCERET);
        console.log(user);
        const userEmail=user.email;
        User.findOne({email:userEmail}).then((data)=>{
            result.send({message:"ok",data:data})
        }).catch((error)=>{
            result.send({message:"error",data:error})
        });
    } catch (error) {
        console.error("Error verifying token:", error);
        result.status(401).json({ message: "Invalid token", error: error.message});
    }
})
    

// app.post("/login-user",async(request,result)=>{
//     const {email,password}=request.body;

//     const user = await User.findOne({email});
//     if(!user){
//         return result.json({message:"User not found"});}
//     if(await bcrypt.compare(password,user.password)){
//         const token = jwt.sign({email}, JWT_SCERET);
//     if(result.status(201)){
//         result.json({message:"User logged in",data:token});
//     }else{
//         result.json({message:"Error"});
//     }
//     }
//     result.json({message:"Error",error:"Invalid Password"});
// });
// app.post("/register", async (request, result) => {
//     const { firstname, lastname, email, password } = request.body;
//     try {
//         await User.create({ firstname, lastname, email, password });
//         result.json({ message: "User created" });
//     } catch (error) {
//         console.error("Registration error:", error); // Logs the actual error
//         result.status(500).json({ message: "Error", error: error.message });
//     }
// });

app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})