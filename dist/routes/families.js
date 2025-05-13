"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const familyManager_1 = require("../models/familyManager");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(express_1.default.json());
const familyManager = new familyManager_1.FamilyManager();
router.get('/families', (req, res) => {
    res.json(familyManager.listFamilies());
});
router.post('/families', (req, res) => {
    const { name, membersCount, hasDogs, memberNames } = req.body;
    const newFamily = familyManager.createFamily(name, membersCount, hasDogs, memberNames);
    res.status(201).json({ message: 'Family created successfully', family: newFamily });
});
router.delete('/families', (req, res) => {
    const { id } = req.body;
    const deletedFamily = familyManager.deleteFamily(id);
    res.status(200).json({ message: 'Family deleted successfully', deletedFamily });
});
router.put('/families', (req, res) => {
    familyManager.updateFamily(req.body.item, req.body.value);
    res.status(200).json({ message: 'Family updated successfully' });
});
exports.default = router;
