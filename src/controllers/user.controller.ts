/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/02/2025
    */

import { userService } from "../services";
import { UserModelType } from "../types";
import { NotFoundError, UnauthorizedError } from '../errors';
import { bcryptService, jwtService, validators } from '../middlewares';

export const signIn = async (body: validators.SigninValidator) => {
    const email = body.email;
    const password = body.password;

    const user = await userService.getOne({ email: email });

    if (!user) {
        throw new NotFoundError('Utilisateur non trouvé');
    }

    const isMatch = await bcryptService.compare(password, user.password);

    if (!isMatch) {
        throw new UnauthorizedError('Mot de passe incorrect');
    }

    return { token: await jwtService.generateToken({ id: user._id.toString() }), id: user._id.toString(), username: user.userName, role: user.role };
};


export async function create(user: validators.RegisterValidator) {
    const hashedPassword = await bcryptService.hash(user.password);
    user.password = hashedPassword;
    const res = await userService.createOne(user);
    return res;
}

export async function getUsersByRole(role: string): Promise<UserModelType[]> {
    return await userService.getMany({ role });
}

export async function getAll() {
    return await userService.findAll();
}
