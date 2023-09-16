const express = require('express');
const app = express();
const mongoose=require('mongoose');
const port=process.env.PORT || 3000;

//connect and create db
try{
    mongoose.connect('mongodb://localhost:27017/bingo',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(res=>{
        console.log('connected to db');
    })
}catch(e){
    console.log('error ',e)
}

app.get('/', function (req, res) {
    res.send('Hello World')
  })
  
  app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})