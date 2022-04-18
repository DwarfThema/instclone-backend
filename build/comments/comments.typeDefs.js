"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type comment {\n    id: Int!\n    user: User!\n    photo: Photo!\n    payload: String!\n    isMine: Boolean!\n    createdAt: String!\n    updatedAt: String!\n  }\n"], ["\n  type comment {\n    id: Int!\n    user: User!\n    photo: Photo!\n    payload: String!\n    isMine: Boolean!\n    createdAt: String!\n    updatedAt: String!\n  }\n"])));
var templateObject_1;