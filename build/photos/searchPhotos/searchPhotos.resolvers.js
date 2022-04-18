"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("../../client"));
var resolvers = {
    Query: {
        searchPhotos: function (_, _a) {
            var keyword = _a.keyword;
            return client_1.default.photo.findMany({ where: { caption: { startsWith: keyword } } });
        },
    },
};
exports.default = resolvers;
