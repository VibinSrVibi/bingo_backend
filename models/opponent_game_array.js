const mongoose=require('mongoose');
const schema=mongoose.Schema;

const opponentGameArray=new schema({
    game_master_id: {type: mongoose.Schema.Types.ObjectId, ref: 'game_master'},
    user_id: {type: String, required: true},
    index: {type: Number, required: true},
    value: {type: Number, required: true},
    status: {type: Number, required: true, default: 0}
});

const opponentGameArraySchema=mongoose.model('opponent_game_array',opponentGameArray);
module.exports=opponentGameArraySchema;