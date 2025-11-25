require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error.middleware');
const authRoutes = require('./routes/v1/auth.routes');
const taskRoutes = require('./routes/v1/tasks.routes');
const userRoutes = require('./routes/v1/user.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// security & middlewares
app.use(helmet());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);

// connect db
connectDB(process.env.MONGO_URI);

// API versioning
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/users', userRoutes);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => res.json({ message: 'API running' }));

// central error handler
app.use(errorHandler);

// start
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
