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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyManager = void 0;
const prisma_1 = require("../../generated/prisma");
class FamilyManager {
    constructor() {
        this.prisma = new prisma_1.PrismaClient();
    }
    createFamily(name, hasDogs, memberNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const membersCount = (memberNames === null || memberNames === void 0 ? void 0 : memberNames.split(',').length) || 0;
            return this.prisma.family.create({
                data: {
                    name,
                    hasDogs: hasDogs || false,
                    memberNames,
                    membersCount,
                    createdAt: new Date()
                }
            });
        });
    }
    deleteFamily(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.family.delete({
                where: { id }
            });
        });
    }
    updateFamily(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = Object.assign({}, updates);
            // If memberNames is being updated, recalculate membersCount
            if (updates.memberNames) {
                data.membersCount = updates.memberNames.split(',').length;
            }
            return this.prisma.family.update({
                where: { id },
                data
            });
        });
    }
    listFamilies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.family.findMany();
        });
    }
    getFamilyById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.family.findUnique({
                where: { id }
            });
        });
    }
}
exports.FamilyManager = FamilyManager;
