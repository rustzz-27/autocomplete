const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const routes  = require('./routes');

function createApp() {
    try {
        const app = express();

        // Middlewares
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(morgan('dev'));
        app.use(helmet());

        // Routes
        app.use('/api', routes);
        return app;
        
    } catch (e) {
        console.error('Error configuring the app:', error);
        return res.status(400).json({ error: e.message });
    }
    
}

module.exports = createApp;
