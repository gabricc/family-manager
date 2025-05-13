import express from 'express';
import router from './routes/familyManager';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', router)

app.get ('/', (req, res) => {
    res.send("Family Manager API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
