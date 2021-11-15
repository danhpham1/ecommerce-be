import * as express from 'express';

import * as roleController from '../controllers/RoleController';

const routerRole = express.Router();

routerRole.post('', roleController.createRole);
routerRole.get('',roleController.findAllRoles);
routerRole.get('/:idRole', roleController.findRoleById);
routerRole.put('/:idRole', roleController.updateNameRole);
routerRole.delete('/:idRole', roleController.deleteRole);

export default routerRole;