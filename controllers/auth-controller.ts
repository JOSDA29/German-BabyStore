import bcrypt from 'bcryptjs';
import UserRepository from '../repositories/UserRepository';
import { Request, Response } from "express";

let auth = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserRepository.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                return res.status(200).json({
                    status: 'Successful authentication'
                });
            }
        }
        return res.status(401).json({
            status: 'Incorrect username or password'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'Internal Server Error'
        });
    }
}

export default auth;
