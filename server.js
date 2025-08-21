// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/authRoutes');   
// const noteRoutes = require('./routes/NotesRoutes');


// const app = express();
// connectDB(); 

// const allowedOrigins = [
//   'https://digital-notes-application.vercel.app',
//   'http://localhost:5173',
      // 'https://notes-digitalnotes.onrender.com',
//   'http://localhost:5000'
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.send('✅ NoteIt backend is running!');
// });
// app.use('/api/auth', authRoutes);  
// app.use('/api/notes', noteRoutes);



// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



// // const express = require('express');
// // const connectDB = require('./config/db');
// // const cors = require('cors');
// // require('dotenv').config();

// // const authRoutes = require('./routes/authRoutes');   
// // const noteRoutes = require('./routes/NotesRoutes');

// // const app = express();
// // connectDB();

// // // explicit allowed origins you trust
// // const allowedOrigins = [
// //   'http://localhost:5173',
// //   'http://localhost:5000',
// //   // add your custom production domain here if you have one:
// //   'https://digital-notes-application.vercel.app'
// // ];

// // // helper to check vercel subdomains
// // function isVercelOrigin(origin) {
// //   if (!origin) return false;
// //   try {
// //     const hostname = new URL(origin).hostname; // e.g. my-app.vercel.app
// //     return hostname === 'vercel.app' || hostname.endsWith('.vercel.app');
// //   } catch (err) {
// //     return false;
// //   }
// // }

// // app.use(cors({
// //   origin: (origin, callback) => {
// //     // 1) Non-browser requests (curl/Postman) often have no origin — allow for convenience
// //     if (!origin) return callback(null, true);

// //     // 2) Exact match in allowedOrigins
// //     if (allowedOrigins.includes(origin)) return callback(null, true);

// //     // 3) Any Vercel subdomain
// //     if (isVercelOrigin(origin)) return callback(null, true);

// //     // 4) Otherwise block
// //     return callback(new Error('CORS policy: This origin is not allowed'), false);
// //   },
// //   credentials: true
// // }));

// // app.use(express.json());

// // // Routes
// // app.get('/', (req, res) => res.send('✅ NoteIt backend is running!'));
// // app.use('/api/auth', authRoutes);
// // app.use('/api/notes', noteRoutes);

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/NotesRoutes');

const app = express();
connectDB();

// ✅ Allowed origins (frontend URLs + dev localhost)
const allowedOrigins = [
  // 'https://digital-notes-application.vercel.app', // your frontend on Vercel
  'http://localhost:5173', // Vite dev
      'https://notes-digitalnotes.onrender.com'
  'http://localhost:3000'  // CRA dev
];

// ✅ Configure CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // 1. Allow requests with no origin (like curl, Postman)
      if (!origin) return callback(null, true);

      // 2. Allow exact matches
      if (allowedOrigins.includes(origin)) return callback(null, true);

      // 3. Allow any *.vercel.app subdomain (useful for preview deploys)
      if (origin.endsWith('.vercel.app')) return callback(null, true);

      // 4. Otherwise block
      return callback(new Error('CORS policy: This origin is not allowed.'), false);
    },
    credentials: true, // needed if you use cookies/auth
  })
);

app.use(express.json());

// ✅ Routes
app.get('/', (req, res) => {
  res.send('✅ NoteIt backend is running!');
});
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
