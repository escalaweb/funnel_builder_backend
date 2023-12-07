
export interface MigrationModel_I {
    name: string;
    up: string[];
    down: string[];
    register?: boolean;
}

export interface MigrationFunctionsModel_I {
    name: string;
    mig: any;
}

export interface _MigrationTable_I {
    id: number;
    timestamp: number;
    name: string;
}