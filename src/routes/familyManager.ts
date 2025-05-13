import { FamilyManager } from "../models/familyManager";
import express from 'express';

const router =  express.Router()
router.use(express.json());

const familyManager = new FamilyManager()

router.get('/families', (req, res) => {
    res.json(familyManager.listFamilies());
});

router.post('/families', (req, res) => {
    const { name, hasDogs, memberNames } = req.body;
    const newFamily = familyManager.createFamily(name, hasDogs, memberNames);
    res.status(201).json({ message: 'Family created successfully', family: newFamily });
});

router.delete('/families', (req, res) => {
    const { id } = req.body;
    const deletedFamily = familyManager.deleteFamily(id);
    res.status(200).json({ message: 'Family deleted successfully', deletedFamily });
});

router.put('/families', (req, res) => {
    familyManager.updateFamily(req.body.item, req.body.value)
    res.status(200).json({ message: 'Family updated successfully' })
})

export default router