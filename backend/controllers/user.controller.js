import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async(req,res)=>{
    try{
        console.log(req);
        const {fullname,email,phoneNumber ,password , role}=req.body;
       
        if(!fullname || !email || !phoneNumber ||!password ||!role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        };
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);

        const user =await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exits..",
                success:false,
            })
        }
   const hassPassword =await bcrypt.hash(password,10);
    await User.create({
        fullname,
        email,
        phoneNumber,
        password:hassPassword,
        role,
        profile:{
            profilePhoto:cloudResponse.secure_url,
        }
    });
    return res.status(201).json({
        message:"Account Created Successfully",
        success:true,
    })
    }
 catch(error){
  console.log(error);
 } 
}

export const login =async(req,res)=>{
    // console.log(req);
    try{
        const {email,password,role}=req.body;
        if(!email||!password ||!role){
            return res.status(400).json({
                message:"something is missing",
                success:false
            });
        };
  let user= await User.findOne({email});
  if(!user){
    return res.status(400).json({
        message:"Incorrect email or password.",
        success:false,
    })
  }
  console.log(user.password);
  const isPasswordMatch =await bcrypt.compare(password,user.password);
  if(!isPasswordMatch)
  {
    return res.status(400).json({
        message:"Incorrect email or password..",
        success:false,
    })
  };
 // check for role is it correct or not
 if(role !== user.role){
    return res.status(400).json({
        message:"Account does't exist with this role",
        success:false,
    });
 };
// console.log(user);
 const tokenData={
    userId:user._id
 }
 const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'});
 user={
    userId:user._id,
    fullname:user.fullname,
    email:user.email,
    phoneNumber:user.phoneNumber,
    role:user.role,
    profile:user.profile
 }
 let fullname=user.fullname;
   return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
    message:`Welcome back ${fullname}`,
    user,
    success:true
   })
    }
    catch(error){
  console.log(error);
    }
}

export const logout =async(req,res)=>{
   try{
   return res.status(200).cookie("token","",{maxAge:0}).json({
    message:"LogOut Successfully..",
    success:true,
   })
   }
   catch(error){
 console.log(error);
   }
}

export const updateProfile=async (req,res)=>{
    try{
        const {fullname,email,phoneNumber , bio , skills}=req.body;
        console.log(fullname,email,phoneNumber,bio,skills);
        const file=req.file;
        
        const fileUri= getDataUri(file);
        const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
         
        //cloudenery portion here
        let skillsArray;
        if(skills){
         skillsArray=skills.split(",");}
        const userId=req.id; //middleware Authentication
        let user=await User.findById(userId);
        if(!user)
        {
            return res.status(400).json({
                message:"User not found",
                success:false,
            })
        }
        if(fullname){
            user.fullname=fullname
        }
        if(email){
            user.email=email
        }
        if(email){
            user.phoneNumber=phoneNumber
        }
        if(email){
            user.profile.bio=bio
        }
        if(email){
            user.profile.skills=skillsArray
        }
    
   
        //resume comes later here...
           if(cloudResponse)
           {
            user.profile.resume=cloudResponse.secure_url;//save the cloudinary url
            user.profile.resumeOriginalName=file.originalname;// Save the original file name
           }
        await user.save();
         
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
         }
         return res.status(200).json({
            message:"Profile Updated Successfully",
            status:true,
         })
    }
    catch (error){
   console.log(error);
    }
}