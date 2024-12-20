const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = new express();
const server = require('http').createServer(app);
const AuthRouter = require('./src/routes/auth.route');

app.use(cors({
    origin: "*",
}));
app.use(bodyParser.json({ limit: "30mb"}));

app.use('/auth',AuthRouter);


const PORT = process.env.PORT || 3004;
server.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
})
