const express = require('express');
const stakeAPI = require('./controllers/stakeApi.controller');
const PORT = 3000;
const app = express();

app.use(express.json());



app.get('/', (req, res) => {
    res.send("Working");
})

app.post('/sendToken' , stakeAPI);

app.listen(PORT, () => {
    console.log(`App listening to the port ${PORT} `)
})