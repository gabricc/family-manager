import { FamilyManager } from '../models/familyManager';
import { PrismaClient } from '../../generated/prisma';
import type { family } from '../../generated/prisma';

type MockPrismaClient = {
    family: {
        create: jest.Mock;
        findMany: jest.Mock;
        delete: jest.Mock;
        update: jest.Mock;
        findUnique: jest.Mock;
    };
};

// Mock PrismaClient
jest.mock('../../generated/prisma', () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            family: {
                create: jest.fn(),
                findMany: jest.fn(),
                delete: jest.fn(),
                update: jest.fn(),
                findUnique: jest.fn()
            }
        }))
    };
});

describe('FamilyManager', () => {
    let familyManager: FamilyManager;
    let prismaClient: MockPrismaClient;

    beforeEach(() => {
        jest.clearAllMocks();
        familyManager = new FamilyManager();
        prismaClient = (familyManager as any).prisma;
    });

    describe('createFamily', () => {
        it('should create a family with all fields', async () => {
            const mockFamily: family = {
                id: 1,
                name: 'Test Family',
                membersCount: 3,
                hasDogs: true,
                memberNames: 'John, Jane, Kid',
                createdAt: new Date()
            };

            prismaClient.family.create.mockResolvedValue(mockFamily);

            const result = await familyManager.createFamily(
                'Test Family',
                true,
                'John, Jane, Kid'
            );

            expect(prismaClient.family.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    name: 'Test Family',
                    hasDogs: true,
                    memberNames: 'John, Jane, Kid',
                    membersCount: 3
                })
            });
            expect(result).toEqual(mockFamily);
        });

        it('should handle family creation without optional fields', async () => {
            const mockFamily: family = {
                id: 1,
                name: 'Simple Family',
                membersCount: 0,
                hasDogs: false,
                memberNames: null,
                createdAt: new Date()
            };

            prismaClient.family.create.mockResolvedValue(mockFamily);

            const result = await familyManager.createFamily('Simple Family');

            expect(prismaClient.family.create).toHaveBeenCalledWith({
                data: expect.objectContaining({
                    name: 'Simple Family',
                    hasDogs: false,
                    memberNames: undefined,
                    membersCount: 0
                })
            });
            expect(result).toEqual(mockFamily);
        });
    });

    describe('listFamilies', () => {
        it('should return all families', async () => {
            const mockFamilies: family[] = [
                {
                    id: 1,
                    name: 'Family 1',
                    membersCount: 3,
                    hasDogs: true,
                    memberNames: 'John, Jane, Kid',
                    createdAt: new Date()
                },
                {
                    id: 2,
                    name: 'Family 2',
                    membersCount: 2,
                    hasDogs: false,
                    memberNames: 'Alice, Bob',
                    createdAt: new Date()
                }
            ];

            prismaClient.family.findMany.mockResolvedValue(mockFamilies);

            const result = await familyManager.listFamilies();

            expect(prismaClient.family.findMany).toHaveBeenCalled();
            expect(result).toEqual(mockFamilies);
        });
    });
});
