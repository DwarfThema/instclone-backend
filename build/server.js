"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
var client_1 = __importDefault(require("./client"));
var schema_1 = require("./schema");
var apollo_server_express_1 = require("apollo-server-express");
var graphql_upload_1 = require("graphql-upload");
var apollo_server_core_1 = require("apollo-server-core");
var users_utils_1 = require("./users/users.utils");
var http_1 = require("http");
var schema_2 = require("@graphql-tools/schema");
var subscriptions_transport_ws_1 = require("subscriptions-transport-ws");
var graphql_1 = require("graphql");
var PORT = process.env.PORT;
var app = (0, express_1.default)();
var schema = (0, schema_2.makeExecutableSchema)({ typeDefs: schema_1.typeDefs, resolvers: schema_1.resolvers });
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var apollo, httpServer, subscriptionServer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apollo = new apollo_server_express_1.ApolloServer({
                    schema: schema,
                    context: function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!ctx.req) return [3 /*break*/, 2];
                                    _a = {};
                                    return [4 /*yield*/, (0, users_utils_1.getUser)(ctx.req.headers.token)];
                                case 1: return [2 /*return*/, (_a.loggedInUser = _b.sent(),
                                        //우리가 users.utils.js에서 만든 getUser 유틸을 사용해서 유저가 누구인지 확인하자.
                                        // token: req.headers.token,
                                        //html 에서 보내는 headers 정보를 vsc에서 사용 할 수 있다. 우리는 token 정보를 이용하자.
                                        _a.client = client_1.default,
                                        _a)];
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); },
                    plugins: [
                        (0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)(),
                        {
                            serverWillStart: function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        return [2 /*return*/, {
                                                drainServer: function () {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        return __generator(this, function (_a) {
                                                            subscriptionServer.close();
                                                            return [2 /*return*/];
                                                        });
                                                    });
                                                },
                                            }];
                                    });
                                });
                            },
                        },
                    ],
                });
                return [4 /*yield*/, apollo.start()];
            case 1:
                _a.sent();
                //app.use(logger("tiny"));
                app.use("/static", express_1.default.static("uploads"));
                app.use((0, graphql_upload_1.graphqlUploadExpress)());
                apollo.applyMiddleware({ app: app });
                httpServer = (0, http_1.createServer)(app);
                subscriptionServer = subscriptions_transport_ws_1.SubscriptionServer.create({
                    schema: schema,
                    execute: graphql_1.execute,
                    subscribe: graphql_1.subscribe,
                    onConnect: function (_a, webSoket, context) {
                        var token = _a.token;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var loggedInUser;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!token) {
                                            throw new Error("You can't listen.");
                                        }
                                        console.log("onConnect!");
                                        return [4 /*yield*/, (0, users_utils_1.getUser)(token)];
                                    case 1:
                                        loggedInUser = _b.sent();
                                        return [2 /*return*/, {
                                                loggedInUser: loggedInUser,
                                            }];
                                }
                            });
                        });
                    },
                    onDisconnect: function (webSokent, context) {
                        console.log("onDisconnect!");
                    },
                }, {
                    server: httpServer,
                    path: apollo.graphqlPath,
                });
                return [4 /*yield*/, new Promise(function (func) { return httpServer.listen({ port: PORT }, func); })];
            case 2:
                _a.sent();
                console.log("\uD83E\uDD16 Server is Ready at http://localhost:".concat(PORT).concat(apollo.graphqlPath));
                return [2 /*return*/];
        }
    });
}); };
startServer();
