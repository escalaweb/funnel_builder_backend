
export interface MigrationModel_I {
    name: string;
    up: string[];
    down: string[];
    pos: number;
    register?: boolean;
}

export interface _MigrationTable_I {
    id: number;
    timestamp: number;
    name: string;
}