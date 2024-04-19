const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/postRoute');
const userRoutes = require('./routes/userRoute');
const {init} = require('./socket');
const { addUserSocket, getUserSocket } = require('./socketManager');
const jwt = require('jsonwebtoken');

require('dotenv').config();

app.use(express.json());

app.use(cors());

app.use('/api/posts', postRoutes);

app.use('/api/users', userRoutes);

mongoose.connect(process.env.DATABASE_URI)
    .then(() => {
        const server = app.listen(process.env.PORT || 8000, ()=> {
            console.log(`Server running on port ${process.env.PORT || 8000}...`);
            
        });
        init(server).on('connection', socket => {

            const token = socket.handshake.query.token;
            try {
                const {_id} = jwt.verify(token, process.env.SECRET);
                console.log(socket.id);
                addUserSocket(_id, socket.id);
            } catch(error) {
                socket.disconnect();
            }

            socket.on('disconnect', () => {
                console.log('User disconnected');
              });
            
        })
    })
    .catch(err=> {
        console.log(err.message);
    })

