const express = require('express');
require('dotenv').config()
const dbConnection = require('./config/db')
const cors = require('cors');
// Create server
const app = express();

// DB Connection
dbConnection();

// Cors
const corsOptions = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(corsOptions) );

// App Port
const port= process.env.PORT

// Body Parser
app.use( express.json() )

app.use( '/api/statics', express.static( 'uploads'));

// App Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/uploads', require('./routes/uploads'));

// Init App
app.listen(port, () => {
    console.log('Server online on port: '+ port);
});