"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("../client"));
exports.default = {
    Room: {
        users: function (_a) {
            var id = _a.id;
            return client_1.default.room
                .findUnique({
                where: {
                    id: id,
                },
            })
                .users();
        },
        messages: function (_a, _b) {
            var id = _a.id;
            var cursor = _b.cursor;
            return client_1.default.message.findMany({
                where: {
                    roomId: id,
                },
            });
        },
        unreadTotal: function (_a, _, _b) {
            var id = _a.id;
            var loggedInUser = _b.loggedInUser;
            if (!loggedInUser) {
                return 0;
            }
            return client_1.default.message.count({
                where: {
                    read: false,
                    roomId: id,
                    user: {
                        id: {
                            not: loggedInUser.id, // 로그인한 유저(내가) 생성하지 않은 Message
                        },
                    },
                },
            });
        },
    },
    Message: {
        user: function (_a) {
            var id = _a.id;
            return client_1.default.message
                .findUnique({
                where: {
                    id: id,
                },
            })
                .user();
        },
    },
};
