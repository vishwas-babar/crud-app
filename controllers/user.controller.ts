import { Request, Response } from 'express';
import db from '../database/postgresConfig';
import asynchandler from '../utils/asynchandler';
import ApiError from '../utils/ApiError';


const getAllUsers = asynchandler(async (req: Request, res: Response) => {
    db.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send('Error in fetching data');
        }
        console.log(result)
        res.status(200).json(result.rows);
    })
})

const createNewUser = asynchandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, 'Please provide all the details')
        // res.status(400).json({ message: 'Please provide all the details' });
    }

    try {
        const user = await db.query(`
            INSERT INTO USERS (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
            [name, email, password])

        res.status(200).json({
            message: 'User created successfully',
            user: user.rows,
        });
    } catch (error: any) {
        console.log(error);
        throw new ApiError(500, 'Error in creating user');
    }
})

const deleteUser = asynchandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, 'Please provide email in the json body');
    }

    const user = await db.query(`
        DELETE FROM users
        WHERE email = $1
        RETURNING *;
    `, [email]);

    
    console.log(user.rows);


    if (user.rows.length === 0) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200).json({
        message: 'User deleted successfully',
        user: user.rows,
    });
})

const updateUser = asynchandler(async (req: Request, res: Response) => {
    const { oldEmail, newEmail, name, password } = req.body;

    if (!oldEmail || !newEmail || !name || !password) {
        throw new ApiError(400, 'Please provide all the details even if you are not updating them');
    }

    const user = await db.query(`
        UPDATE users
        SET email = $1, name = $2, password = $3
        WHERE email = $4
        RETURNING *;
    `, [newEmail, name, password, oldEmail])

    if (user.rowCount === 0) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200).json({
        message: 'User updated successfully',
        user: user.rows,
    });
})


const getSingleUser = asynchandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, 'Please provide email in the json body');
    }

    const user = await db.query(`
        SELECT * FROM users
        WHERE email = $1;
    `, [email]);

    if (user.rows.length === 0) {
        throw new ApiError(404, 'User not found');
    }

    res.status(200).json({
        message: 'User found',
        user: user.rows,
    });
})

export {
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getSingleUser,
}