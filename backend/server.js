const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resumes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Connect to MongoDB Atlas
const connectToAtlas = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI not found in .env file');
            console.log('💡 Run setup-atlas.sh to configure your Atlas connection');
            process.exit(1);
        }

        console.log('🌐 Connecting to MongoDB Atlas...');

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'resumeparspro'
        });

        console.log('✅ Connected to MongoDB Atlas!');
        console.log(`🗄️ Database: ${mongoose.connection.db.databaseName}`);

    } catch (error) {
        console.error('❌ MongoDB Atlas connection failed:', error.message);
        console.log('🔧 Check: 1) Connection string 2) IP whitelist 3) User credentials');
        process.exit(1);
    }
};

connectToAtlas();

app.get('/health', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
        status: 'OK', service: 'resumeparspro-atlas', port: PORT,
        database: { status: dbStatus, type: 'MongoDB Atlas' },
        timestamp: new Date().toISOString()
    });
});

app.use('/api/auth', authRoutes);
app.use('/api/resumes', resumeRoutes);

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log('🌐 ResumeParsePro Atlas Edition');
    console.log(`🚀 Backend: http://localhost:${PORT}`);
    console.log('🗄️ Database: MongoDB Atlas (Cloud)');
    console.log('✅ Beautiful UI ready!');
});