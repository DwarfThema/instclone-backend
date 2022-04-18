"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    comment: {
        isMine: function (_a, _, _b) {
            var userId = _a.userId;
            var loggedInUser = _b.loggedInUser;
            if (!loggedInUser) {
                return false;
            }
            else {
                return userId === loggedInUser.id;
            }
        },
    },
};
