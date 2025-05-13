"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyManager = void 0;
const family_1 = require("./family");
class FamilyManager {
    constructor() {
        this.families = [];
    }
    createFamily(name, hasDogs, memberNames) {
        const family = new family_1.Family(family_1.Family.generateId(), name, (memberNames === null || memberNames === void 0 ? void 0 : memberNames.split(',').length) || 0, hasDogs, memberNames);
        this.families.push(family);
    }
    deleteFamily(id) {
        this.families = this.families.filter(family => family.id !== id);
    }
    updateFamily(item, value) {
        this.families.forEach(family => {
            switch (item) {
                case "name":
                    family.name = value;
                    break;
                case "membersCount":
                    family.membersCount = parseInt(value);
                    break;
                case "hasDogs":
                    family.hasDogs = Boolean(value);
                    break;
                case "memberNames":
                    family.memberNames = value;
                    break;
                default:
                    break;
            }
        });
    }
    listFamilies() {
        return this.families.map(family => family.listAllFamilies());
    }
}
exports.FamilyManager = FamilyManager;
