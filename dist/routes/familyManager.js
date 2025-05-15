"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const familyManager_1 = require("../models/familyManager");
const express_1 = __importStar(require("express"));
const router = (0, express_1.Router)();
router.use(express_1.default.json());
const familyManager = new familyManager_1.FamilyManager();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Get all families
router.get('/families', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const families = yield familyManager.listFamilies();
    res.json(families);
})));
// Get family by ID
router.get('/families/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const family = yield familyManager.getFamilyById(Number(req.params.id));
    if (!family) {
        res.status(404).json({ message: 'Family not found' });
        return;
    }
    res.json(family);
})));
// Create new family
router.post('/families', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, hasDogs, memberNames } = req.body;
    if (!name) {
        res.status(400).json({ message: 'Name is required' });
        return;
    }
    const newFamily = yield familyManager.createFamily(name, hasDogs, memberNames);
    res.status(201).json({ message: 'Family created successfully', family: newFamily });
})));
// Delete family
router.delete('/families/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedFamily = yield familyManager.deleteFamily(Number(req.params.id));
        res.status(200).json({ message: 'Family deleted successfully', family: deletedFamily });
    }
    catch (error) {
        res.status(404).json({ message: 'Family not found' });
    }
})));
// Update family
router.put('/families/:id', asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, hasDogs, memberNames } = req.body;
    try {
        const updatedFamily = yield familyManager.updateFamily(Number(req.params.id), {
            name,
            hasDogs,
            memberNames
        });
        res.status(200).json({ message: 'Family updated successfully', family: updatedFamily });
    }
    catch (error) {
        res.status(404).json({ message: 'Family not found' });
    }
})));
// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
});
exports.default = router;
