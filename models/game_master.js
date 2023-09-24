const mongoose=require('mongoose');
const schema=mongoose.Schema;

const game_master=new schema({
    datetime: {type: Date, default: Date.now},
    user_id: {type:String, required: true},
    gameId: {type: String, required: true},
    userPlayStatus: {type: Number, required: true, default: 0},
    opponentUserId: {type:String, required: true},
    opponentPlayStatus: {type: Number, required: true, default: 0},
    winner: {type:String, required: true},
    status: {type:Number, required: true, default: 0}
});

const gameMasterSchema=mongoose.model('game_master',user);
module.exports=gameMasterSchema;