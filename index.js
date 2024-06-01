import express from 'express';
import router from './routes/router.js';

process.loadEnvFile;

const app = express();
const port = process.env.PORT || 3000;

//Routes
app.use('/', router)

// Undefined route managament
app.get('*', (req, res) => {
    res.send('<center><h1>This page does not exist...👻</h1></center>');
});

// Express server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});