const express = require("express")
const cors =require('cors')
require("dotenv").config()
const {prisma} = require("./config/db")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const path = require("path")
const PORT = process.env.PORT 



const app = express()

app.use(express.json())







app.use("/api/user", userRouter)
app.use("/api/product", productRouter)


app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});



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