/*
    * Developer:  Mohamed Aziz Louhichi
    * Company: None
    * Date: 28/03/2025
    */ 
    
    export type ChatModelType = {
      _id?:string,
      sender:string,
      receiver:string,
      message:string,
      status:"sent" | "delivered" | "read",
      createdAt?:Date,
      updatedAt?:Date,
      isDeleted?:boolean
    };

    