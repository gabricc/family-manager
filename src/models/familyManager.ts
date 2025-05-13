import { Family } from "./family";

export class FamilyManager {
    private families: Family[] = []
    createFamily(name: string, hasDogs?: boolean, memberNames?: string) {
        const family = new Family(
            Family.generateId(),
            name,
            memberNames?.split(',').length || 0,
            hasDogs,
            memberNames
        )
        this.families.push(family)
    }
    deleteFamily(id: number): void {
        this.families = this.families.filter(family => family.id !== id)
    }
    updateFamily(item: string, value: string): void {
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
        })
    }

    listFamilies() {
        return this.families.map(family => family.listAllFamilies())
    }
}
