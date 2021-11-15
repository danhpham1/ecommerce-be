import { Role } from './../entity/Role';
import * as express from 'express';
import { getManager } from 'typeorm';
import { HTTPS_CODE } from '../const/HttpCode';
import { MESSAGES } from '../const/Messages';

export async function findAllRoles(req: express.Request, res: express.Response) {
    try {
        const roles = await getManager().createQueryBuilder(Role, 'role').getMany();
        return res.status(HTTPS_CODE.FIND).json({
            code: HTTPS_CODE.FIND,
            message: MESSAGES.FINDSUCCESS,
            data: roles
        })
    } catch (error) {
        return res.status(HTTPS_CODE.ERROR).json({
            error: error.sqlMessage,
            code: error.code
        })
    }
}

export async function findRoleById(req: express.Request, res: express.Response) {
    const idRole = req.params.idRole;
    if (!idRole) {
        return res.status(HTTPS_CODE.ERROR).json({
            message: MESSAGES.ROLEFINDBYIDERROR,
            code: HTTPS_CODE.ERROR
        })
    }
    try {
        const role = await getManager().createQueryBuilder(Role, 'role').where("role.id = :id", { id: idRole }).getOne();
        return res.status(HTTPS_CODE.FIND).json({
            messsage: MESSAGES.FINDSUCCESS,
            data: role || {},
            code: HTTPS_CODE.FIND
        })
    } catch (error) {
        return res.status(HTTPS_CODE.ERROR).json({
            error: MESSAGES.FINDERROR
        })
    }
}

export async function createRole (req:express.Request,res:express.Response) {
    if(!req.body.role_name){
        return res.status(HTTPS_CODE.ERROR).json({
            code: HTTPS_CODE.ERROR,
            error:MESSAGES.ROLEMISSPARAMETERS
        });
    }

    const role = new Role();

    role.role_name = req.body.role_name;
    role.created_at = new Date();
    role.updated_at = new Date();

    try {
        const roleManager = getManager();
        const roleSave = await roleManager.save(role);
        return res.status(HTTPS_CODE.CREATED).json({
            message:MESSAGES.ROLECREATE,
            data:roleSave,
            code: HTTPS_CODE.CREATED
        })
    } catch (error) {
        return res.status(HTTPS_CODE.ERROR).json({
            error: error.sqlMessage,
            code:error.code
        })        
    }
}

export async function updateNameRole(req:express.Request,res:express.Response) {
    const idRole = req.params.idRole;
    const roleName = req.body.role_name;

    if(!idRole || !roleName){
        return res.status(HTTPS_CODE.ERROR).json({
            error: MESSAGES.ROLEMISSPARAMETERS,
            code: HTTPS_CODE.ERROR
        })
    }
    try {
        if(roleName == ''){
            return res.status(HTTPS_CODE.ERROR).json({
                error: MESSAGES.ROLEUPDATEEMPTYPARAMETERS,
                code:HTTPS_CODE.ERROR
            })
        }
        const role = await getManager().createQueryBuilder().update(Role).set({role_name:roleName,updated_at:new Date()}).where("id = :id",{id:idRole}).execute();
        return res.status(HTTPS_CODE.CREATED).json({
            message:MESSAGES.ROLEUPDATESUCCESS,
            data:role || {},
            code: HTTPS_CODE.CREATED
        })
    } catch (error) {
        return res.status(HTTPS_CODE.ERROR).json({
            error:error ? error : MESSAGES.ROLEUPDATEERROR,
            code: HTTPS_CODE.ERROR
        })  
    }
}

export async function deleteRole(req: express.Request, res: express.Response) {
    const idRole = req.params.idRole;
    if (!idRole) {
        return res.status(HTTPS_CODE.ERROR).json({
            error: MESSAGES.ROLEMISSPARAMETERS,
            code: HTTPS_CODE.ERROR
        })
    }
    try {
        const role = await getManager().createQueryBuilder().delete().from(Role).where("id = :id",{id:idRole}).execute();
        return res.status(HTTPS_CODE.CREATED).json({
            message:MESSAGES.ROLEDELETESUCCESS,
            data:role || {},
            code:HTTPS_CODE.CREATED
        })
    } catch (error) {
        return res.status(HTTPS_CODE.ERROR).json({
            error: error ? error : MESSAGES.ROLEDELETEERROR,
            code: HTTPS_CODE.ERROR
        })  
    }
}