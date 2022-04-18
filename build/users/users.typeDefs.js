"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_1 = require("apollo-server");
exports.default = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: Int!\n    firstName: String!\n    lastName: String\n    userName: String!\n    email: String!\n    createdAt: String!\n    updatedAt: String!\n    bio: String\n    avatar: String\n    photos: [Photo]\n    followers: [User]\n    following: [User]\n    totalFollowing: Int!\n    totalFollowers: Int!\n    isMe: Boolean!\n    isFollowing: Boolean!\n  }\n"], ["\n  type User {\n    id: Int!\n    firstName: String!\n    lastName: String\n    userName: String!\n    email: String!\n    createdAt: String!\n    updatedAt: String!\n    bio: String\n    avatar: String\n    photos: [Photo]\n    followers: [User]\n    following: [User]\n    totalFollowing: Int!\n    totalFollowers: Int!\n    isMe: Boolean!\n    isFollowing: Boolean!\n  }\n"])));
var templateObject_1;
/* Use 에는 패스워드는 해줄 필요가 없다. */
/* schema 를 새로 작성해주면 반드시 다시 Migrate 를 다시해줘야함 */
