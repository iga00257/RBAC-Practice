import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/userRoutes';
import mongoose from 'mongoose';
import { createRoles } from '../utils/createRole';
import { assignRoles, createUsers } from '../utils/assignRole';
import authRouter from './routes/auth';



const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const app = express();
const PORT = 3000;


async function init() {
  // await createUsers();
  await createRoles();
  await assignRoles();
}
init()
// Connect to MongoDB

mongoose.connect(uri,{dbName:"RBAC"})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', router);
app.use('/auth', authRouter);



// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});