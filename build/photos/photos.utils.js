"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processHashtags = void 0;
var processHashtags = function (caption) {
    var hashtags = caption.match(/^#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
    return hashtags.map(function (hashtag) { return ({
        where: { hashtag: hashtag },
        create: { hashtag: hashtag },
    }); });
};
exports.processHashtags = processHashtags;
