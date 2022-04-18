"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type seeFollowingResult {\n    ok: Boolean!\n    error: String\n    following: [User]\n    totalPages: Int\n  }\n  type Query {\n    seeFollowing(userName: String!, lastId: Int): seeFollowingResult!\n  }\n"], ["\n  type seeFollowingResult {\n    ok: Boolean!\n    error: String\n    following: [User]\n    totalPages: Int\n  }\n  type Query {\n    seeFollowing(userName: String!, lastId: Int): seeFollowingResult!\n  }\n"])));
var templateObject_1;