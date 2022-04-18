"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("../../client"));
var users_utils_1 = require("../../users/users.utils");
var resolverFn = function (_, _a, _b) {
    var offset = _a.offset;
    var loggedInUser = _b.loggedInUser;
    return client_1.default.photo.findMany({
        take: 2,
        skip: offset,
        where: {
            OR: [
                {
                    user: {
                        followers: {
                            some: {
                                id: loggedInUser.id,
                            },
                        },
                    },
                },
                {
                    userId: loggedInUser.id,
                },
            ],
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
var resolvers = {
    Query: {
        seeFeed: (0, users_utils_1.protectedResolver)(resolverFn),
    },
};
exports.default = resolvers;
