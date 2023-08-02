"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const dynamoose_1 = require("dynamoose");
exports.UserSchema = new dynamoose_1.Schema({
    id: {
        type: String,
        hashKey: true,
    },
    name: {
        type: String,
        default: 'default cosa'
    },
    email: {
        type: String,
    },
});
//# sourceMappingURL=users.schema.js.map