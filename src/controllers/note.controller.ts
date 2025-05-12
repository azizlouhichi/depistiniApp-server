/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 11/04/2025
    */

import { validators } from "../middlewares";
import { noteService } from "../services";


export async function create(note: validators.NoteIdValidator) {
    return await noteService.createOne(note);
}

export async function getAll(userId: string) {
    const result = await noteService.getMany({ userId });

    if (!result) {
        throw new Error("No notes found");
    }
    else {
        let notes: Array<any> = [];
        await Promise.all(result.map(async (note) => {
            notes.push({
                id: note.id,
                userId: note.userId,
                content: note.content,
                date: note.date,
            });
        }))

        return notes;
    }
}


export async function deleteOne(id: string) {
    return await noteService.deleteOne(id);
}