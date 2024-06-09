const express = require('express');
const userRouter = require('./routes/user');
const noteRouter = require('./routes/note');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Notes App');
});

app.use("/api/user", userRouter)
app.use("/api/note", noteRouter)

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});