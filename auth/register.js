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
    var userNo = pad.substring(0, pad.length - count.length) + count
    console.log('count data ',count)
    

    //check email id already exist

    userSchema.find({email:req.body.email}).then(async result=>{
        if(result.length>0){
            //update data
            console.log('update user data')
            let userUpdateData={
                name: req.body.name,
                email: req.body.email,
                description: req.body.description,
                profile_url: req.body.profile_url,
                access_token: await functions.generate_token(16),
                fcm_token: req.body.fcm_token
            }
             userSchema.findOneAndUpdate({email: req.body.email},userUpdateData,{new: true}).then((update_res)=>{
                console.log(update_res);
                res.json({
                    status: true,
                    statuscode: 200,
                    message: 'success',
                    data:{
                        user_id: update_res.user_id,
                        access_token: update_res.access_token
                    }
                })
            }).catch((update_error)=>{
                console.log(`update error: ${update_error}`)
                res.json({
                    status: true,
                    statuscode: 200,
                    message: 'Error in updation',
                    data:{}
                });
            });
            // new userSchema(userUpdateData).updateOne({
            //     email: req.body.email
            // }).then((update_res)=>{
            //     console.log(update_res);
            // }).catch((update_error)=>{
            //     console.log(`update error: ${update_error}`)
            // });
        }else{
            //insert data
            let userData={
                user_id: 'bingo_000'+userNo,
                name: req.body.name,
                email: req.body.email,
                description: req.body.description,
                profile_url: req.body.profile_url,
                access_token: await functions.generate_token(16),
                fcm_token: req.body.fcm_token
            }
            console.log('insert user data');
            new userSchema(userData).save().then((save_res)=>{
                console.log(save_res);
                res.json({
                    status: true,
                    statuscode: 200,
                    message: 'success',
                    data:{
                        user_id: save_res.user_id,
                        access_token: save_res.access_token
                    }
                })
            }).catch(save_error=>{
                console.log(`save error: ${save_error}`);
                res.json({
                    status: true,
                    statuscode: 200,
                    message: 'Error in insertion',
                    data:{}
                });
            })
        }
    }).catch(email_check_error=>{
        console.log('email check error ', email_check_error)
    }) 

    
})

module.exports=router;
 