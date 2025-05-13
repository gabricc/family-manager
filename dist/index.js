"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const familyManager_1 = require("./models/familyManager");
/*familyManager.createFamily(
    "Familia Real",
    5,
    true,
    "Gabriel, Lorrane, Helena, Simba, Costela"
)
familyManager.createFamily(
    "Familia Nao Real",
    10
)
console.log(familyManager.listFamilies())
*/
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
const familyManager = new familyManager_1.FamilyManager();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
