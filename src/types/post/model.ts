/*
    * Developer:  Mohamed Aziz Louhichi
    * Company: None
    * Date: 08/04/2025
    */ 
    
    export type PostModelType = {
      _id?:string,
      userId:string,
      content:string,
      comments?:CommentModelType[],
      createdAt?:Date,
      updatedAt?:Date,
      isDeleted?:boolean
    };

    export type CommentModelType = {
      userId:string,
      content:string,
      createdAt?:Date,
      updatedAt?:Date
    };

    