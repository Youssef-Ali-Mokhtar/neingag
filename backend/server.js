const express = require('express');
const mongoConnect = require('./util/database').mongoConnect;
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/postRoute');

app.use(express.json());

app.use(cors());

app.use('/api/posts', postRoutes);

// app.use((req, res, next)=>{
//     console.log("WORKS");
//     next();
// })

mongoConnect(()=>{
    app.listen(4000, ()=> {
        console.log('Server running on port 4000...');
    });
})

