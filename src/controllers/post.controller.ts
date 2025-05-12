/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/04/2025
    */

import { validators } from "../middlewares";
import { postService, userService } from "../services";



export async function create(post: validators.PostIdValidator) {
    return await postService.createOne(post);
}
export async function getAll() {
    const result = await postService.getAll();

    if (!result) {
        throw new Error("No posts found");
    }
    else {
        let posts: Array<any> = [];
        await Promise.all(result.map(async (post) => {
            const getUser = await userService.getById(post.userId);
            posts.push({
                id: post.id,
                userId: post.userId,
                content: post.content,
                createdAt: post.createdAt,
                user: {
                    name: getUser?.fullName,
                    role: getUser?.role,
                },
            });
        }))

        return posts;
    }
}


