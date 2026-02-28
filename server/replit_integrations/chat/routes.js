"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChatRoutes = registerChatRoutes;
var openai_1 = require("openai");
var storage_1 = require("./storage");
var openai = new openai_1.default({
    apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
    baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});
function registerChatRoutes(app) {
    var _this = this;
    // Get all conversations
    app.get("/api/conversations", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var conversations, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, storage_1.chatStorage.getAllConversations()];
                case 1:
                    conversations = _a.sent();
                    res.json(conversations);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error fetching conversations:", error_1);
                    res.status(500).json({ error: "Failed to fetch conversations" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Get single conversation with messages
    app.get("/api/conversations/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, conversation, messages, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    id = parseInt(req.params.id);
                    return [4 /*yield*/, storage_1.chatStorage.getConversation(id)];
                case 1:
                    conversation = _a.sent();
                    if (!conversation) {
                        return [2 /*return*/, res.status(404).json({ error: "Conversation not found" })];
                    }
                    return [4 /*yield*/, storage_1.chatStorage.getMessagesByConversation(id)];
                case 2:
                    messages = _a.sent();
                    res.json(__assign(__assign({}, conversation), { messages: messages }));
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error fetching conversation:", error_2);
                    res.status(500).json({ error: "Failed to fetch conversation" });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    // Create new conversation
    app.post("/api/conversations", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var title, conversation, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    title = req.body.title;
                    return [4 /*yield*/, storage_1.chatStorage.createConversation(title || "New Chat")];
                case 1:
                    conversation = _a.sent();
                    res.status(201).json(conversation);
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error("Error creating conversation:", error_3);
                    res.status(500).json({ error: "Failed to create conversation" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Delete conversation
    app.delete("/api/conversations/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var id, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    id = parseInt(req.params.id);
                    return [4 /*yield*/, storage_1.chatStorage.deleteConversation(id)];
                case 1:
                    _a.sent();
                    res.status(204).send();
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    console.error("Error deleting conversation:", error_4);
                    res.status(500).json({ error: "Failed to delete conversation" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    // Send message and get AI response (streaming)
    app.post("/api/conversations/:id/messages", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var conversationId, content, messages, chatMessages, stream, fullResponse, _a, stream_1, stream_1_1, chunk, content_1, e_1_1, error_5;
        var _b, e_1, _c, _d;
        var _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 17, , 18]);
                    conversationId = parseInt(req.params.id);
                    content = req.body.content;
                    // Save user message
                    return [4 /*yield*/, storage_1.chatStorage.createMessage(conversationId, "user", content)];
                case 1:
                    // Save user message
                    _g.sent();
                    return [4 /*yield*/, storage_1.chatStorage.getMessagesByConversation(conversationId)];
                case 2:
                    messages = _g.sent();
                    chatMessages = messages.map(function (m) { return ({
                        role: m.role,
                        content: m.content,
                    }); });
                    // Set up SSE
                    res.setHeader("Content-Type", "text/event-stream");
                    res.setHeader("Cache-Control", "no-cache");
                    res.setHeader("Connection", "keep-alive");
                    return [4 /*yield*/, openai.chat.completions.create({
                            model: "gpt-5.1",
                            messages: chatMessages,
                            stream: true,
                            max_completion_tokens: 8192,
                        })];
                case 3:
                    stream = _g.sent();
                    fullResponse = "";
                    _g.label = 4;
                case 4:
                    _g.trys.push([4, 9, 10, 15]);
                    _a = true, stream_1 = __asyncValues(stream);
                    _g.label = 5;
                case 5: return [4 /*yield*/, stream_1.next()];
                case 6:
                    if (!(stream_1_1 = _g.sent(), _b = stream_1_1.done, !_b)) return [3 /*break*/, 8];
                    _d = stream_1_1.value;
                    _a = false;
                    chunk = _d;
                    content_1 = ((_f = (_e = chunk.choices[0]) === null || _e === void 0 ? void 0 : _e.delta) === null || _f === void 0 ? void 0 : _f.content) || "";
                    if (content_1) {
                        fullResponse += content_1;
                        res.write("data: ".concat(JSON.stringify({ content: content_1 }), "\n\n"));
                    }
                    _g.label = 7;
                case 7:
                    _a = true;
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _g.trys.push([10, , 13, 14]);
                    if (!(!_a && !_b && (_c = stream_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _c.call(stream_1)];
                case 11:
                    _g.sent();
                    _g.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15: 
                // Save assistant message
                return [4 /*yield*/, storage_1.chatStorage.createMessage(conversationId, "assistant", fullResponse)];
                case 16:
                    // Save assistant message
                    _g.sent();
                    res.write("data: ".concat(JSON.stringify({ done: true }), "\n\n"));
                    res.end();
                    return [3 /*break*/, 18];
                case 17:
                    error_5 = _g.sent();
                    console.error("Error sending message:", error_5);
                    // Check if headers already sent (SSE streaming started)
                    if (res.headersSent) {
                        res.write("data: ".concat(JSON.stringify({ error: "Failed to send message" }), "\n\n"));
                        res.end();
                    }
                    else {
                        res.status(500).json({ error: "Failed to send message" });
                    }
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    }); });
}
