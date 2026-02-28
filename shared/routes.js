"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.errorSchemas = void 0;
exports.buildUrl = buildUrl;
var zod_1 = require("zod");
var schema_1 = require("./schema");
exports.errorSchemas = {
    validation: zod_1.z.object({
        message: zod_1.z.string(),
        field: zod_1.z.string().optional(),
    }),
    notFound: zod_1.z.object({
        message: zod_1.z.string(),
    }),
    internal: zod_1.z.object({
        message: zod_1.z.string(),
    }),
};
exports.api = {
    ideas: {
        analyze: {
            method: 'POST',
            path: '/api/ideas/analyze',
            input: schema_1.insertIdeaSchema,
            responses: {
                200: zod_1.z.custom(),
                400: exports.errorSchemas.validation,
                500: exports.errorSchemas.internal,
            },
        },
        get: {
            method: 'GET',
            path: '/api/ideas/:id',
            responses: {
                200: zod_1.z.custom(),
                404: exports.errorSchemas.notFound,
            },
        }
    },
};
function buildUrl(path, params) {
    var url = path;
    if (params) {
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (url.includes(":".concat(key))) {
                url = url.replace(":".concat(key), String(value));
            }
        });
    }
    return url;
}
