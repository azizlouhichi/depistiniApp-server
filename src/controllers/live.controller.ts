/*
    * Developer: Mohamed Aziz Louhichi
    * Company: None
    * Date: 03/03/2025
    */

import { validators } from "../middlewares";
import { liveService } from "../services";

   
    export async function create(live: validators.LiveIdValidator) {
        return await liveService.createOne(live);
    }

    export async function getAll() {
        return await liveService.findAll();
    }

    export async function deleteOne(id: string) {
        return await liveService.deleteOne(id);
    }
   
   
    