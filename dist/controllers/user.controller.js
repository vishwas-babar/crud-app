"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = exports.updateUser = exports.deleteUser = exports.createNewUser = exports.getAllUsers = void 0;
const postgresConfig_1 = __importDefault(require("../database/postgresConfig"));
const asynchandler_1 = __importDefault(require("../utils/asynchandler"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const getAllUsers = (0, asynchandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    postgresConfig_1.default.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).send('Error in fetching data');
        }
        console.log(result);
        res.status(200).json(result.rows);
    });
}));
exports.getAllUsers = getAllUsers;
const createNewUser = (0, asynchandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ApiError_1.default(400, 'Please provide all the details');
        // res.status(400).json({ message: 'Please provide all the details' });
    }
    try {
        const user = yield postgresConfig_1.default.query(`
            INSERT INTO USERS (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [name, email, password]);
        res.status(200).json({
            message: 'User created successfully',
            user: user.rows,
        });
    }
    catch (error) {
        console.log(error);
        throw new ApiError_1.default(500, 'Error in creating user');
    }
}));
exports.createNewUser = createNewUser;
const deleteUser = (0, asynchandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new ApiError_1.default(400, 'Please provide email in the json body');
    }
    const user = yield postgresConfig_1.default.query(`
        DELETE FROM users
        WHERE email = $1
        RETURNING *;
    `, [email]);
    console.log(user.rows);
    if (user.rows.length === 0) {
        throw new ApiError_1.default(404, 'User not found');
    }
    res.status(200).json({
        message: 'User deleted successfully',
        user: user.rows,
    });
}));
exports.deleteUser = deleteUser;
const updateUser = (0, asynchandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldEmail, newEmail, name, password } = req.body;
    if (!oldEmail || !newEmail || !name || !password) {
        throw new ApiError_1.default(400, 'Please provide all the details even if you are not updating them');
    }
    const user = yield postgresConfig_1.default.query(`
        UPDATE users
        SET email = $1, name = $2, password = $3
        WHERE email = $4
        RETURNING *;
    `, [newEmail, name, password, oldEmail]);
    if (user.rowCount === 0) {
        throw new ApiError_1.default(404, 'User not found');
    }
    res.status(200).json({
        message: 'User updated successfully',
        user: user.rows,
    });
}));
exports.updateUser = updateUser;
const getSingleUser = (0, asynchandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new ApiError_1.default(400, 'Please provide email in the json body');
    }
    const user = yield postgresConfig_1.default.query(`
        SELECT * FROM users
        WHERE email = $1;
    `, [email]);
    if (user.rows.length === 0) {
        throw new ApiError_1.default(404, 'User not found');
    }
    res.status(200).json({
        message: 'User found',
        user: user.rows,
    });
}));
exports.getSingleUser = getSingleUser;
