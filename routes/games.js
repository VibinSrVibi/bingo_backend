const express=require('express');
const router=express.Router();
const mongoose=express('mongoose');
const bodyParser=require('body-parser');
const gameSchema=require('../models/game_master');
const functions=require('../functions/function');

router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/create',(req,res)=>{
    var user_id=req.body.user_id;
    var game_id
    const date=new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    console.log(year,month,day)
    //check game_master db to set game id
    gameSchema.find({
        datetime:{
            $gte: new Date(year, month, day),
            $lt: new Date(year, month, day)
        }
    }).then(gameData=>{
        console.log(gameData.length)
    }).catch(gameDataError=>{
        console.log(`Game Data Error: ${gameDataError}`);
    })
});

module.exports=router;