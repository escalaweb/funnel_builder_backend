import { Injectable } from "@nestjs/common";

type PopulatePath = string;
type ModelName = string;

export interface PopulateRequest {
    path: PopulatePath;
    model: ModelName;
    populate?: PopulateRequest;
}



export class ModelRegistry {

    private static models: Map<string, any> = new Map();

    public static register(modelName: string, modelInstance: any): void {
        this.models.set(modelName, modelInstance);
    }

    public static getInstance(modelName: string): any | undefined {
        return this.models.get(modelName);
    }
}


@Injectable()
export class DynamooseHelper {

    constructor() {

    }

    async populate<T>( document: T, populateRequests: PopulateRequest[] = [] ): Promise<any>{

        if(populateRequests.length === 0){
            return document;
        }
        //determine if document is array or object
        if(Array.isArray(document)){

            return this.populateMany(document, populateRequests);

        }else{

            return this.populateOne(document, populateRequests);

        }

    }

    async populateOne(document: any, populateRequests: PopulateRequest[] = []): Promise<Document> {

        for (const populateRequest of populateRequests) {

            const { path, model } = populateRequest;
            const modelInstance = ModelRegistry.getInstance(model);

            if (!modelInstance) {
                throw new Error(`Model ${model} not found in ModelRegistry`);
            }

            const idToPopulate = document[path];

            if(Array.isArray(idToPopulate)){

                // document[path] = await this.populateMany(idToPopulate, populateRequests);

                const populatedDocuments: Document[] = [];

                for (const document of idToPopulate) {

                    const populatedDocument = await modelInstance.get(document);

                    populatedDocuments.push({...populatedDocument}) ;
                }
                document[path] = [...populatedDocuments];

            }else{

                const populatedDocument = await modelInstance.get(idToPopulate);
                document[path] = {...populatedDocument} ;

            }

        }

        return {...document};
    }

    async populateMany(documents: Document[], populateRequests: PopulateRequest[]): Promise<Document[]> {

        const populatedDocuments: Document[] = [];

        for (const document of documents) {
            const populatedDocument = await this.populateOne(document, populateRequests);
            populatedDocuments.push(populatedDocument);
        }

        return populatedDocuments;
    }
}

