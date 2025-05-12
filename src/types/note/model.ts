/*
    * Developer:  Mohamed Aziz Louhichi
    * Company: None
    * Date: 11/04/2025
    */ 
    
    export type NoteModelType = {
      _id?:string,
      userId: string,
      content: string,
      date: string,
      createdAt?:Date,
      updatedAt?:Date,
      isDeleted?:boolean
    };

    