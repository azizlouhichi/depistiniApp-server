/*
    * Developer:  Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/02/2025
    */ 
    
    export type UserModelType = {
      fullName: string,
      email: string,
      userName: string,
      role: string,
      password: string,
      _id?:string,
      createdAt?:Date,
      updatedAt?:Date,
      isDeleted?:boolean
    };

    