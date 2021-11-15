import * as express from 'express';

const routerUser = express.Router();

routerUser.get('/create',(request:express.Request,response:express.Response) => {
    response.json({
        message:"Ok"
    })
})

export default routerUser;