const express = require("express")
const cors =require('cors')
require("dotenv").config()
const {prisma} = require("./config/db")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")

const PORT = process.env.PORT 
const app = express()
 const allowedOrigins= ['https://dashboard-assignment-xi.vercel.app']
const corsOptions = {
 // Allowed origins
   origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
        
    } else {
        callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',               // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization',            // Allowed headers in preflight requests
  exposedHeaders: ['Content-Length', 'Authorization'],    // Headers to expose to the browser
  credentials: true,                                       // Allow credentials (e.g., cookies)
  maxAge: 3600,                                            // Cache preflight requests for 1 hour
  preflightContinue: false,                                // Don't continue processing if CORS checks fail
  optionsSuccessStatus: 204,                               // HTTP status code for successful preflight requests
};

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://dashboard-assignment-xi.vercel.app');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use(express.json())
app.use(cors(corsOptions))

app.options('*', cors(corsOptions));




app.get("/", async(req,res)=>{

    try {
        res.status(200).send("Welcome to the Backend of Lms")
    } catch (error) {
        res.status(500).send(
            {
                "message":"Internal Server Errer",
                "Error":error.message,
                "result":false
            }
        )
    }
})

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)

//
app.use((err, req, res, next) => {
  if (err) {
    console.error('CORS Error:', err.message); // Log CORS errors
    res.status(403).json({ error: 'Not allowed by CORS' });
  } else {
    next();
  }
});



const checkDatabaseConnection = async () => {
    try {
      // Perform a simple query to check the connection
      await prisma.$queryRaw`SELECT 1`;
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database', error);
      process.exit(1); // Exit the process with an error code
    }
  };
  
  // Check database connection before starting the server
  checkDatabaseConnection().then(() => {
 

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });