"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var load_files_1 = require("@graphql-tools/load-files");
var merge_1 = require("@graphql-tools/merge");
var loadedTypes = (0, load_files_1.loadFilesSync)("".concat(__dirname, "/**/*.typeDefs.{js,ts}"));
var loadedResolvers = (0, load_files_1.loadFilesSync)("".concat(__dirname, "/**/*.resolvers.{js,ts}"));
exports.typeDefs = (0, merge_1.mergeTypeDefs)(loadedTypes);
exports.resolvers = (0, merge_1.mergeResolvers)(loadedResolvers);
