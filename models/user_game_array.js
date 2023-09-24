const mongoose=require('mongoose');
const schema=mongoose.Schema;

const userGameArray=new schema({
    game_master_id: {type: mongoose.Schema.Types.ObjectId, ref: 'game_master'},
    user_id: {type: String, required: true},
    index: {type: Number, required: true},
    value: {type: Number, required: true},
    status: {type: Number, required: true, default: 0}
});

const userGameArraySchema=mongoose.model('user_game_array',userGameArray);
module.exports=userGameArraySchema;