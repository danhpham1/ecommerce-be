import * as express from 'express';
import * as bodyParser from 'body-parser';

import routerRole from './Routes/Role';
import routerUser from './Routes/User';
import { createConnection } from 'typeorm';

const app = express();

async function connectDb(){
    await createConnection();
}

connectDb();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api/v1/auth',routerUser);
app.use('/api/v1/roles', routerRole);

app.listen(3000,()=>{
    console.log("Server start");
})