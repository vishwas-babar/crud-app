import { Router } from "express";
import { 
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getSingleUser,
 } from "../controllers/user.controller";


const router = Router();

router.get('/', getAllUsers);

router.post('/create', createNewUser);

router.delete('/delete', deleteUser);

router.put('/update', updateUser);

router.get('/get-user', getSingleUser);

export default router;