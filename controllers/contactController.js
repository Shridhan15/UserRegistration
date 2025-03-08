//not avoid try catch
const asyncHandler=require("express-async-handler");
const Contact=require("../models/contachModal")

//@ desc Get all contact
//@route GET /api/contact
//@access public

const getContacts = asyncHandler(async (req,res)=>{
    const contacts= await Contact.find();
    res.status(200).json(contacts);//if you want to send a json responce
})


//@ desc create New contact
//@route POST /api/contact
//@access public

const createContact= asyncHandler(async (req,res)=>{
    
    console.log("The request body )is",req.body);//get some data in the request from user
    const{name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All feilds are mandatory");//this respose is send as html we need a middleware to send it in json
    }
    const contact= await Contact.create({
        name,
        email,
        phone,

    });

    res.status(201).json(contact);
})

//@ desc get contact
//@route GET /api/contact/:id
//@access public

const getContact= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
})


//@ desc update contact
//@route PUT /api/contact/Lid
//@access public
const updateContact= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);//if you want to send a json responce use {updatedContact}
})


//@ desc delete contact
//@route DELETE /api/contact/:id
//@access public

const deleteContact= asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    await contact.deleteOne();
    
    res.status(200).json({message:"deleted",contact});//if you want to send a json responce
})


module.exports={getContacts,createContact,getContact,updateContact,deleteContact}