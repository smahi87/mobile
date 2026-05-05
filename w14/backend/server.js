const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/users', (req,res)=> {
    const filepath = path.join(__dirname, 'users.json');
    fs.readFile(filepath,'utf-8',(err,data) => {
    if(err)
    {
        return res.status(500).json({error : 'unable to fetch users'});
    }

    const users = JSON.parse(data);
    res.json(users);
});
});

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});