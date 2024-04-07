const userSocketMap = {};

function addUserSocket(userId, socketId) {
    userSocketMap[userId] = socketId;
}

function removeUserSocket(userId) {
    delete userSocketMap[userId];
}

function getUserSocket(userId) {
    return userSocketMap[userId];
}

module.exports = {
    addUserSocket,
    removeUserSocket,
    getUserSocket
};