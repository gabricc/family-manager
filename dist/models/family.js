"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Family = void 0;
class Family {
    constructor(id, name, membersCount, hasDogs, memberNames) {
        this.id = id;
        this.name = name;
        this.membersCount = membersCount;
        this.hasDogs = hasDogs;
        this.memberNames = memberNames;
    }
    listAllFamilies() {
        return {
            id: this.id,
            name: this.name,
            membersCount: this.membersCount,
            hasDogs: this.hasDogs,
            memberNames: this.memberNames ? this.memberNames.split(',').map(name => name.trim()) : []
        };
    }
    static generateId() {
        return this.nextId++;
    }
}
exports.Family = Family;
Family.nextId = 1;
