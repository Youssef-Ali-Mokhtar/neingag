const express = require('express');

const app = express();

app.use((req, res)=>{
    
    res.header('Content-Type', 'application/json');

    res.send({"message":"This is a message!!"});
});

app.listen(4000, ()=> {
    console.log('Server running on port 4000...');
});