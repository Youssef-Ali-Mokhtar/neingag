const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/postRoute');
const userRoutes = require('./routes/userRoute');
const User = require('./models/userModel');
const requireAuth = require('./middleware/requireAuth');
require('dotenv').config();

app.use(express.json());

app.use(cors());

app.use('/api/posts', postRoutes);

app.use('/api/users', userRoutes);

mongoose.connect(('mongodb+srv://youssef96mokhtar:LinuxLinux96@cluster0.aqpb7ct.mongodb.net/neingag?retryWrites=true&w=majority&appName=Cluster0'))
    .then(()=>{
        app.listen(4000, ()=> {
            console.log('Server running on port 4000...');
        });
    })
    .catch(err=>{
        console.log(err.message);
    })

