//to send json formate error in case of error, it is being used as a middleware

const {constants}=require("../constansts");
const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode? res.statusCode:500;
    switch(statusCode){
        //send the response as per what is the error
        case constants.VALIDATION_ERROR:
            res.json({ 
                title:"Validation Failed", 
                message:err.message,
                stackTrack:err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({ title:"Not Found", message:err.message,stackTrack:err.stack});

        
        case constants.UNAUTHORIZED:
            res.json({ title:"Un authorized", message:err.message,stackTrack:err.stack});//stackTrace- track which file has error
            
        case constants.FORBIDDEN:
            res.json({ title:"Forbidden", message:err.message,stackTrack:err.stack});
       
        case constants.SERVER_ERROR:
            res.json({ title:"Server error", message:err.message,stackTrack:err.stack});
    
        default:
            console.log("No error, all good")
            break;


    }
   
    
};

module.exports=errorHandler;