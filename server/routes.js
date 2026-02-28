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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
var storage_1 = require("./storage");
var routes_1 = require("@shared/routes");
var zod_1 = require("zod");
var openai_1 = require("openai");
var openai = new openai_1.default({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});
function registerRoutes(httpServer, app) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            app.post(routes_1.api.ideas.analyze.path, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var input, prompt_1, response, analysis, idea, err_1;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 3, , 4]);
                            input = routes_1.api.ideas.analyze.input.parse(req.body);
                            prompt_1 = "You are an expert business idea validator for Indian entrepreneurs.\n      A user has shared their startup idea: \"".concat(input.description, "\"\n      \n      Please analyze this idea and provide a JSON response strictly following this format:\n{\n  \"marketCompetition\": \"Assess market competition and saturation level in India.\",\n  \"targetAudience\": \"Identify the target audience and suggest alternative markets if needed.\",\n  \"successRate\": 65,\n  \"uniqueDifferentiators\": [\n    \"Way 1 to make the idea unique\",\n    \"Way 2\",\n    \"Way 3\"\n  ],\n  \"governmentSchemes\": [\n    \"Relevant Indian government scheme 1\",\n    \"Scheme 2\"\n  ],\n  \"roadmap\": {\n    \"thisWeek\": \"What they should do this week to validate the idea.\",\n    \"thisMonth\": \"What they should do this month.\",\n    \"thisQuarter\": \"What they should do this quarter to launch.\"\n  },\n  \"milestones\": [\n  {\n    \"stageNumber\": 1,\n    \"title\": \"Problem Validation\",\n    \"objective\": \"Conduct 30 interviews to validate demand\",\n    \"expectedOutcome\": \"Clear customer pain point validation\"\n  },\n  {\n    \"stageNumber\": 2,\n    \"title\": \"MVP Development\",\n    \"objective\": \"Build a minimal prototype\",\n    \"expectedOutcome\": \"Working beta product\"\n  },\n  {\n    \"stageNumber\": 3,\n    \"title\": \"Market Testing\",\n    \"objective\": \"Acquire first 50\u2013100 users\",\n    \"expectedOutcome\": \"Initial traction metrics\"\n  }\n]\n}\n\nCRITICAL:\n- Divide the startup journey into 3 to 6 logical stages only.\n- Stages must be customized based on the idea.\n- Each stage must include:\n  - stageNumber\n  - title\n  - objective\n  - expectedOutcome\n- Keep it practical and execution-focused.\n- Do NOT repeat roadmap content.\n- Only one stage must be marked as \"in_progress\".\n- Previous stages must be \"completed\".\n- Remaining must be \"pending\".\n- successRate must be a realistic number between 0 and 100 based on competition, differentiation and feasibility in India.\n- Do NOT give generic high percentages.\n- Ensure the JSON is valid.");
                            return [4 /*yield*/, openai.chat.completions.create({
                                    model: "llama-3.3-70b-versatile",
                                    messages: [{ role: "user", content: prompt_1 }],
                                    response_format: { type: "json_object" },
                                })];
                        case 1:
                            response = _c.sent();
                            analysis = JSON.parse(((_b = (_a = response.choices[0]) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.content) || "{}");
                            return [4 /*yield*/, storage_1.storage.createIdea(input, analysis)];
                        case 2:
                            idea = _c.sent();
                            res.status(200).json(idea);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _c.sent();
                            if (err_1 instanceof zod_1.z.ZodError) {
                                return [2 /*return*/, res.status(400).json({
                                        message: err_1.errors[0].message,
                                        field: err_1.errors[0].path.join('.'),
                                    })];
                            }
                            console.error("Analysis error:", err_1);
                            res.status(500).json({ message: "Failed to analyze idea" });
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
            app.get(routes_1.api.ideas.get.path, function (req, res) { return __awaiter(_this, void 0, void 0, function () {
                var id, idea, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            id = Number(req.params.id);
                            return [4 /*yield*/, storage_1.storage.getIdea(id)];
                        case 1:
                            idea = _a.sent();
                            if (!idea) {
                                return [2 /*return*/, res.status(404).json({ message: "Idea not found" })];
                            }
                            res.status(200).json(idea);
                            return [3 /*break*/, 3];
                        case 2:
                            err_2 = _a.sent();
                            res.status(500).json({ message: "Failed to fetch idea" });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/, httpServer];
        });
    });
}
