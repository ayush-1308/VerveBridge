const express = require('express');
const userRouter = require('./routes/user');
const noteRouter = require('./routes/note');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://verve-bridge-9vi8ojuz8-ayushs-projects-6d3b7cab.vercel.app/'
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Notes App');
});

app.use("/api/user", userRouter)
app.use("/api/note", noteRouter)

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});