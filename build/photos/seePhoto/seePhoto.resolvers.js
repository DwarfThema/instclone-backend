"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("../../client"));
var resolvers = {
    Query: {
        seePhoto: function (_, _a) {
            var id = _a.id;
            return client_1.default.photo.findUnique({
                where: {
                    id: id,
                },
            });
        },
    },
};
exports.default = resolvers;
