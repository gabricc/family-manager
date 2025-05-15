import { PrismaClient } from '../../generated/prisma';
import type { family } from '../../generated/prisma';

export class FamilyManager {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async createFamily(name: string, hasDogs?: boolean, memberNames?: string): Promise<family> {
        const membersCount = memberNames?.split(',').length || 0;
        return this.prisma.family.create({
            data: {
                name,
                hasDogs: hasDogs || false,
                memberNames,
                membersCount,
                createdAt: new Date()
            }
        });
    }

    async deleteFamily(id: number): Promise<family> {
        return this.prisma.family.delete({
            where: { id }
        });
    }

    async updateFamily(id: number, updates: Partial<Omit<family, 'id' | 'createdAt' | 'membersCount'>>): Promise<family> {
        const data: any = { ...updates };
        
        // If memberNames is being updated, recalculate membersCount
        if (updates.memberNames) {
            data.membersCount = updates.memberNames.split(',').length;
        }

        return this.prisma.family.update({
            where: { id },
            data
        });
    }

    async listFamilies(): Promise<family[]> {
        return this.prisma.family.findMany();
    }

    async getFamilyById(id: number): Promise<family | null> {
        return this.prisma.family.findUnique({
            where: { id }
        });
    }
}
