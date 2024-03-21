const express = require('express');
const mongoConnect = require('./util/database').mongoConnect;
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/postRoute');
const userRoutes = require('./routes/userRoute');
const UserModel = require('./models/userModel');

app.use(express.json());

app.use(cors());

app.use((req, res, next)=>{

    UserModel.getUser(user=> {
        req.user = user;
        next();
    }, '65fad700b1c6c1ff0a5b7e3b');
})

app.use('/api/posts', postRoutes);

app.use('/api/users', userRoutes);

mongoConnect(()=>{
    app.listen(4000, ()=> {
        console.log('Server running on port 4000...');
    });
})

