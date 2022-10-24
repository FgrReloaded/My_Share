const users = [];

const addUser = ({ id, room }) => {
    if(room){
        room = room.trim().toLowerCase();
    }
    const existingUser = users.find((user) => user.room === room);
    if (!room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, room };
    users.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUsersInRoom };