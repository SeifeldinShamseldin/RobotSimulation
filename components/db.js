// ---------------------- Import Required Module ----------------------
const mongoose = require('mongoose'); // Mongoose is used to interact with MongoDB

// ---------------------- Database Connection Setup ----------------------
// Connect to the local MongoDB instance named 'fraunhofer-auth'
// `useNewUrlParser` and `useUnifiedTopology` are options to handle deprecated warnings

mongoose.connect('mongodb://localhost:27017/fraunhofer-auth', {
  useNewUrlParser: true,       // Use the modern URL string parser
  useUnifiedTopology: true     // Use the new server discovery and monitoring engine
})

// ---------------------- Connection Success ----------------------
.then(() => {
  console.log('MongoDB connected'); // Log success message if connection is established
})

// ---------------------- Connection Failure ----------------------
.catch(err => {
  console.error('MongoDB connection error:', err); // Log error message if connection fails
});