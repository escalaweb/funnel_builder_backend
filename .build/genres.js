"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case");
const dynamoose = require("dynamoose");
const fs = require("fs");
const glob = require("glob-promise");
const yaml = require("js-yaml");
const path = require("path");
const args = process.argv.slice(2);
const matchPattern = args[1];
const outputFile = args[2];
const deletionPolicy = 'Delete';
const globalOptions = {
    throughput: 'ON_DEMAND',
    prefix: '${self:service}-${self:provider.stage}-',
    suffix: '-table',
};
async function main() {
    if (!matchPattern || !outputFile) {
        console.log('missing required arguments.');
        return;
    }
    const slsResources = { Resources: {} };
    const files = await glob.promise(matchPattern);
    await Promise.all(files.map(async (file) => {
        var _a;
        console.log('detected:', file);
        const fileNameExt = file.split(/[\\\/]/).pop();
        const fileName = fileNameExt.split('.').shift();
        const tableName = (0, change_case_1.pascalCase)(fileName);
        const exports = await (_a = `.${path.sep}${file}`, Promise.resolve().then(() => require(_a)));
        const schema = Object.values(exports).shift();
        if (schema.constructor.name === 'Schema') {
            const model = dynamoose.model(fileName, schema, globalOptions);
            slsResources.Resources[`${tableName}Table`] = {
                Type: 'AWS::DynamoDB::Table',
                DeletionPolicy: deletionPolicy,
                Properties: await model.table().create({ return: 'request' }),
            };
        }
    }));
    const yamlReources = yaml.dump(slsResources);
    const outputPath = outputFile.split(/[\\\/]/);
    if (outputPath.length > 1) {
        await fs.promises.mkdir(outputPath.slice(0, outputPath.length - 1).join(path.sep), { recursive: true });
    }
    await fs.promises.writeFile(outputFile, yamlReources);
    console.log(`Serverless resources file generated at ${outputFile}`);
    process.exit(0);
}
main();
//# sourceMappingURL=genres.js.map