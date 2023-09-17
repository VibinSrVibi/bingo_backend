const mongoose=require('mongoose');
const schema=mongoose.Schema;

const user=new schema({
    user_id: {type: String, required: true},
    name: {type: String, required:true},
    description: {type: String, required: false},
    profile_url: {type: String, required:false},
    user_type: {type:String, required:false, default: 'user'},
    created_datetime: {type:Date, default: Date.now},
    email: {type: String, required:true},
    access_token: {type: String, required:true},
    fcm_token: {type: String, required:true},
    online_status: {type: Number, required:true, default: 1},
    last_seen: {type: Date, required: false,default: Date.now},
    status: {type: Number, required:true, default: 1}
});

const userSchema=mongoose.model('user',user);
module.exports=userSchema;