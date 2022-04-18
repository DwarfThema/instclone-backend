"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("../../client"));
var resolvers = {
    Query: {
        seeProfile: function (_, _a) {
            var userName = _a.userName;
            return client_1.default.user.findUnique({
                where: {
                    userName: userName,
                },
                include: {
                    following: true,
                    followers: true,
                },
            });
        },
    },
};
exports.default = resolvers;
