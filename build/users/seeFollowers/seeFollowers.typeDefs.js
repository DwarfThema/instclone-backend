"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type seeFollowersResult {\n    ok: Boolean!\n    error: String\n    followers: [User]\n    totalPages: Int\n  }\n  type Query {\n    seeFollower(userName: String!, page: Int!): seeFollowersResult!\n  }\n"], ["\n  type seeFollowersResult {\n    ok: Boolean!\n    error: String\n    followers: [User]\n    totalPages: Int\n  }\n  type Query {\n    seeFollower(userName: String!, page: Int!): seeFollowersResult!\n  }\n"])));
var templateObject_1;
