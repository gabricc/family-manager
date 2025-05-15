import { FamilyManager } from "../models/familyManager";
import express, { Request, Response, Router, NextFunction } from 'express';

const router = Router();
router.use(express.json());

const familyManager = new FamilyManager();

// Error handling middleware
type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
const asyncHandler = (fn: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Get all families
router.get('/families', asyncHandler(async (req: Request, res: Response) => {
    const families = await familyManager.listFamilies();
    res.json(families);
}));

// Get family by ID
router.get('/families/:id', asyncHandler(async (req: Request, res: Response) => {
    const family = await familyManager.getFamilyById(Number(req.params.id));
    if (!family) {
        res.status(404).json({ message: 'Family not found' });
        return;
    }
    res.json(family);
}));

// Create new family
router.post('/families', asyncHandler(async (req: Request, res: Response) => {
    const { name, hasDogs, memberNames } = req.body;
    if (!name) {
        res.status(400).json({ message: 'Name is required' });
        return;
    }

    const newFamily = await familyManager.createFamily(name, hasDogs, memberNames);
    res.status(201).json({ message: 'Family created successfully', family: newFamily });
}));

// Delete family
router.delete('/families/:id', asyncHandler(async (req: Request, res: Response) => {
    try {
        const deletedFamily = await familyManager.deleteFamily(Number(req.params.id));
        res.status(200).json({ message: 'Family deleted successfully', family: deletedFamily });
    } catch (error) {
        res.status(404).json({ message: 'Family not found' });
    }
}));

// Update family
router.put('/families/:id', asyncHandler(async (req: Request, res: Response) => {
    const { name, hasDogs, memberNames } = req.body;
    try {
        const updatedFamily = await familyManager.updateFamily(Number(req.params.id), {
            name,
            hasDogs,
            memberNames
        });
        res.status(200).json({ message: 'Family updated successfully', family: updatedFamily });
    } catch (error) {
        res.status(404).json({ message: 'Family not found' });
    }
}));

// Error handling middleware
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
});

export default router;