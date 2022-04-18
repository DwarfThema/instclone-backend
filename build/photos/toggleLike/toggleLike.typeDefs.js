"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type toggleLikeResult {\n    ok: Boolean!\n    error: String\n  }\n\n  type Mutation {\n    toggleLike(id: Int!): toggleLikeResult\n  }\n"], ["\n  type toggleLikeResult {\n    ok: Boolean!\n    error: String\n  }\n\n  type Mutation {\n    toggleLike(id: Int!): toggleLikeResult\n  }\n"])));
var templateObject_1;
