import * as express from 'express';

const app = express();

app.get('/',(req:express.Request,res:express.Response)=>{
    res.json({
        message:'Ok'
    })
})

app.listen(3000,()=>{
    console.log("Server start");
})