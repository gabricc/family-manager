//import { MemberType } from "./definitions";
import { iFamily } from "./definitions";

export class Family implements iFamily {
    constructor(
        public id: number,
        public name: string,
        public membersCount: number,
        public hasDogs?: boolean,
        public memberNames?: string
    ) {}

    listAllFamilies() {
        return {
            id: this.id,
            name: this.name,
            membersCount: this.membersCount,
            hasDogs: this.hasDogs,
            memberNames: this.memberNames ? this.memberNames.split(',').map(name => name.trim()) : []
        };
    }
    private static nextId: number = 1;
    static generateId(): number {
        return this.nextId++;
    }
}