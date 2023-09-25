const express = require('express');
const app = express();
const mongoose=require('mongoose');
const port=process.env.PORT || 3000;
const userRoute=require('./auth/register');
const gameRoute=require('./routes/games');
const cors=require('cors');
app.use(cors({
    origin: '*'
}));


//connect and create db
try{
    mongoose.connect('mongodb://127.0.0.1:27017/bingo',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(res=>{
        console.log('connected to db');
    })
}catch(e){
    console.log('db connection error ',e)
}

app.use(express.json());
app.use("/api/auth",userRoute);
app.use("/api/game",gameRoute);

app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
  app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})