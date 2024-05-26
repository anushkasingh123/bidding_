const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
//const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { sequelize,connectDB } = require('./Utils/db');
//const setupWebSocket = require('./Utils/socket');

// Load environment variable
dotenv.config();

// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Routes
const authRoutes = require('./Routes/authRoutes');
const itemRoutes = require('./Routes/itemRoutes');
/*const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');*/

app.use('/users', authRoutes);
app.use('/items', itemRoutes);
/*app.use('/items', bidRoutes);
app.use('/notifications', notificationRoutes);*/

// Socket.io Bidding Events
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('bid', (data) => {
        console.log('Bid placed:', data);
        io.emit('update', data); // Notify all connected clients about a new bid on an item
    });
});

// Error handling middleware
/*app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});*/

// Start server
const PORT = process.env.PORT ;
const server = app.listen(PORT,async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB();
    await sequelize.sync({alter:true});
});

//setupWebSocket(server);