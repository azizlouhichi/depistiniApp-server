const fs = require('fs');

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function createFiles(name) {
  const developer =  `Mohamed Aziz Louhichi`;
  const currentDate = new Date().toLocaleDateString();

  //   const files = ['index.ts', 'controller.ts', 'model.ts', 'service.ts'];

  const modelType = `${capitalizeFirstLetter(name)}ModelType`;
  const modelModel = `${capitalizeFirstLetter(name)}Model`;

  //!types

  fs.mkdirSync(`./src/types/${name}`);
  fs.writeFileSync(
    `./src/types/${name}/index.ts`,
    `/*
    * Developer: ${developer}
    * Company: None
    * Date: ${currentDate}
    */ \n \n
    
    export * from './model';
    export * from './response';
    `,
  );
  fs.writeFileSync(
    `./src/types/${name}/response.ts`,
    `/*
    * Developer: ${developer}
    * Company: None
    * Date: ${currentDate}
    */
   
   export type ${name}ResponseType = Pick<${modelType}, '_id'>;
   
    `,
  );
  fs.writeFileSync(
    `./src/types/${name}/model.ts`,
    `/*
    * Developer:  ${developer}
    * Company: None
    * Date: ${currentDate}
    */ 
    
    export type ${modelType} = {
      _id:string,
      createdAt:Date,
      updatedAt:Date,
      isDeleted:boolean
    };

    `,
  );
  fs.writeFileSync(
    `./src/types/${name}/${name}.ts`,
    `/*
    * Developer:  ${developer}
    * Company: None
    * Date: ${currentDate}
    */
   
    export type ${capitalizeFirstLetter(name)}Creator = {
        //!example
        name?:string
      };
   
    `,
  );

  fs.appendFileSync(`./src/types/index.ts`, ` \n export *  from   './${name}'`);

  //!validators
  if (!fs.existsSync('./src/middlewares/validators')) fs.mkdirSync(`./src/middlewares/validators`);
  fs.writeFileSync(
    `./src/middlewares/validators/${name}.ts`,
    `/*
    * Developer: ${developer}
    * Company: None
    * Date: ${currentDate}
    */
   
    import { Expose, Transform } from 'class-transformer';
    import {IsDefined,IsMongoId} from 'class-validator';

    export class ${capitalizeFirstLetter(name)}IdValidator {
    @IsDefined()
    @Expose()
    @IsMongoId() 
    _id:string
    }

    export class QueryValidator {
    @IsOptional()
    @Expose()
    @Transform((obj) => {
      const limit = parseInt(obj.value) || 10;
      return Math.min(limit, 100);
    })
    @IsNumber()
    limit: number;

    @IsOptional()
    @Expose()
    @Transform((obj) => parseInt(obj.value) || 1)
    @IsNumber()
    page: number;

    @IsOptional()
    @Expose()
    @IsString()
    search?: string;
}
    `,
  );
  fs.appendFileSync(`./src/middlewares/validators/index.ts`, ` \n export ${name}Validator  from   './${name}'`);

  //! service.ts
  const servicePath = `./src/services/${name}.service.ts`;
  fs.writeFileSync(servicePath, ``);
  fs.appendFileSync(
    servicePath,
    `/*
    * Developer: ${developer}
    * Company: None
    * Date: ${currentDate}
    */

    \n\n
   
    import { ${modelType} } from '../types';
    import ${modelModel} from '../models/${name}.model';
    import { FilterQuery, UpdateQuery } from 'mongoose';
    import { InternalServerError } from '../errors';

      export function createOne(${name}: ${modelType}) {
        try {
          return  ${modelModel}.create(${name});
        } catch (error) {
        throw new InternalServerError('','${name}.service createOne',${name}  )
        }
      }

      export function createMany(${name}s: ${modelType}[] ) {
        try {
          return  ${modelModel}.insertMany(${name}s);
        } catch (error) {
        throw new InternalServerError('','${name}.service createMany',${name}s  )
        }
      }
    
      export function getOne(filter: FilterQuery<${modelType}>) {
        try {
          return  ${modelModel}.findOne(filter);
        } catch (error) {
        throw new InternalServerError('','${name}.service getOne',filter  )
        }
      }
      export function getById(_id: string) {
        try {
          return  ${modelModel}.findById(_id);
        } catch (error) {
        throw new InternalServerError('','${name}.service getById',{_id}  )
        }
      }

      export function getMany(filter: FilterQuery<${modelType}>) {
        try {
          return  ${modelModel}.find(filter);
        } catch (error) {
        throw new InternalServerError('','${name}.service getMany',filter  )
        }
      }

      export function count(filter: FilterQuery<${modelType}>) {
        try {
          return  ${modelModel}.countDocuments(filter);
        } catch (error) {
        throw new InternalServerError('','${name}.service count',filter  )
        }
      }

      


      export async function updateOne(filter: FilterQuery<${modelType}>,update:UpdateQuery<${modelType}>) {
        try {
          return  await ${modelModel}.updateOne(filter,update);
        } catch (error) {
        throw new InternalServerError('','${name}.service updateOne',{filter,update}  )
        }
      }


      export async function updateMany(filter: FilterQuery<${modelType}>,update:UpdateQuery<${modelType}>) {
        try {
          return  await ${modelModel}.updateMany(filter,update);
        } catch (error) {
        throw new InternalServerError('','${name}.service updateMany',{filter,update}  )
        }
      }

      export async function  getIdis(filter: FilterQuery<${modelType}>) {
        try {
          return await ${modelModel}.find(filter).distinct('_id')
        } catch (error) {
        throw new InternalServerError('','${name}.service getIdis',filter  )
        }
      }
    `,
  );
  fs.appendFileSync(`./src/services/index.ts`, `export * as ${name}Service from './${name}.service'; \n`);
  //! model.ts
  const modelPath = `./src/models/${name}.model.ts`;
  fs.writeFileSync(
    modelPath,
    `/*
    * Developer: ${developer}
    * Company: None
    * Date: ${currentDate}
    */ \n \n
    
import { Schema, model, Types, Document } from 'mongoose';
import {  ${modelType} } from '../types';





export const ${name}Schema = new Schema<${modelType}>(
 {

 },
  { timestamps: true },
);


const ${modelModel} = model<${modelType}>('${name}', ${name}Schema);


export default ${modelModel};
    `,
  );

  //! controller.ts
  const controllerPath = `./src/controllers/${name}.controller.ts`;
  fs.writeFileSync(
    controllerPath,
    `/*
    * Developer: ${developer}
    * Company: None
    * Date: ${currentDate}
    */
   
    export async function create() {}
   
   
    `,
  );
  fs.appendFileSync(`./src/controllers/index.ts`, `export * as ${name}Controller from   './${name}.controller' \n`);

  //! helpers.ts
  const helperPath = `./src/helpers/${name}.helper.ts`;
  fs.writeFileSync(
    helperPath,
    `/*
    * Developer: ${developer}
    * Company: None
    * Date: ${currentDate}
    */
   
   export const  ${name}Helper = {}
   
   
    `,
  );
  fs.appendFileSync(`./src/helpers/index.ts`, `export * as ${name}Helper from   './${name}.helper' \n`);
  //! routes.ts
  const routerPath = `./src/routes/${name}.route.ts`;
  fs.writeFileSync(
    routerPath,
    `/*
    * Developer: ${developer}
    * Company: None
    * Date: ${currentDate}
    */ \n \n`,
  );
  fs.appendFileSync(
    routerPath,
    `
  import express, { NextFunction, Request } from 'express';
  import { ResponseType } from '../types/ResponseType';
  import { ${name}Controller } from '../controllers';

  const ${name}Routes = (app: express.Application) => {


    app.post(
      '/${name}s',
      //!jwtService.verifyToken,
      //!ValidatorMiddleware.validateBody(${name}Validator.****),
      async function (req: Request, res: ResponseType<void>) {
        const {body} = req
        //await ${name}Controller.create(body);
        res.status(201).send();
      },
    );
  
    app.get(
      '/${name}s',
      //!jwtService.verifyToken,
      //!ValidatorMiddleware.validateQuery(${name}Validator.****),
      async function (req: Request, res: ResponseType<any[]>) {
        const {} = req
        //const result = await ${name}Controller.getAll();
        res.status(201).send({result:'result'});
      },
    );


  };

  export default ${name}Routes;
    
  `,
  );
  fs.appendFileSync(`./src/routes/index.ts`, `export * from './${name}.route';\n`);
  console.log(`Files created successfully for "${name}" `);
}

const teamName = process.argv[2];
if (!teamName) {
  console.error('Please provide a team name.');
} else {
  createFiles(teamName);
}
