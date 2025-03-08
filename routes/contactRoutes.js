const express=require("express");
const router=express.Router();

// router.route('/:id').put((req,res)=>{
//     res.status(200).json({message: `update contact for ${req.params.id}`});//if you want to send a json responce
// })// earlier we did this for all api but better is to have from a seperate file contactController

//get the api from contactController.js
const {getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,}=require("../controllers/contactController");


router.route('/').get(getContacts).post(createContact);//since they have same route (/api/contact)

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);// /api/contact/:id
//test api through thunder client

module.exports=router;