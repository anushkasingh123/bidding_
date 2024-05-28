const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize,connectDB } = require('./Utils/db');
const apiLimiter = require('./Utils/rateLimiter')
const setupWebSocket = require('./Utils/socket');

// Load environment variable
dotenv.config();

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/api', apiLimiter);


// Routes
const authRoutes = require('./Routes/authRoutes');
const itemRoutes = require('./Routes/itemRoutes');
const bidRoutes = require('./Routes/bidRoutes');
const notificationRoutes = require('./Routes/notificationRoutes');

app.use('/api/users', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.io Bidding Events
/*io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('bid', (data) => {
        console.log('Bid placed:', data);
        io.emit('update', data); // Notify all connected clients about a new bid on an item
    });
});*/

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
    await sequelize.sync({alter:true, });
});

setupWebSocket(server);