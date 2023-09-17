const express=require('express');
const router=express.Router();
const mongoose=express('mongoose');
const bodyParser=require('body-parser');
const userSchema=require('../models/user');
const formidable=require('formidable');
const functions=require('../functions/function');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/register',async (req,res)=>{
    // const form=new formidable.IncomingForm();
    // console.log('form data ',form)
    // form.parse(req,function(err,field,file){
    //     console.log(field,typeof field.form,field.form[0])
    // });
    var count=0;
    var pad = "0000"
    
    await userSchema.find().then(user_data=>{
        console.log(user_data.length)
        count=user_data.length+1;
        //console.log('inner loop',count)
    }).catch(e=>{
        console.log('user count error',e)
    });
    var ans = pad.substring(0, pad.length - count.length) + count
    console.log('count data ',count)
    let userData={
        user_id: 'bingo_000'+ans,
        name: req.body.name,
        email: req.body.email,
        description: req.body.description,
        profile_url: req.body.profile_url,
        access_token: await functions.generate_token(16),
        fcm_token: req.body.fcm_token,
    }

    //check email id already exist

    userSchema.find({email:req.body.email}).then(result=>{
        if(result.length>0){
            //update data
            console.log('update user data')
        }else{
            //insert data
            console.log('insert user data')
        }
    }).catch(email_check_error=>{
        console.log('email check error ', email_check_error)
    }) 

    console.log('route is called',userData);
})

module.exports=router;
 