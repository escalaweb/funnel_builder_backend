import { MigrationInterface, QueryRunner } from "typeorm"

export class InitPermisions1701898729627 implements MigrationInterface {

    name = 'InitPermisions1701898729627';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Obtén los registros de la tabla funnels_library
        const funnelsLibraryRecords = await queryRunner.query('SELECT * FROM funnels_library');

        // Itera sobre los registros y llena la tabla library_permisions
        for (const funnelLibrary of funnelsLibraryRecords) {
            const elementsEffect = 'all'; // Establece el valor que corresponda
            const permisionType = 0; // Establece el valor que corresponda
            const funnelLibraryId = funnelLibrary._id; // Asegúrate de obtener el ID correcto
            const user_id = funnelLibrary.user_id; // Asegúrate de obtener el ID correcto
            const date = funnelLibrary.updatedAt; // Asegúrate de obtener la fecha correcta
            await queryRunner.query(
                'INSERT INTO library_permisions ("elementsEffect", "permisionType", "funnelLibrary_id", "user_id", "updatedAt") VALUES ($1, $2, $3, $4, $5)', [elementsEffect, permisionType, funnelLibraryId, user_id, date]
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // En el método "down", puedes revertir la operación realizada en "up"
        await queryRunner.query('DELETE FROM library_permisions');
    }

}
