const express = require("express")
const cors =require('cors')
require("dotenv").config()
const {prisma} = require("./config/db")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")

const PORT = process.env.PORT || 3000
const app = express()


app.use(express.json())
app.use(cors())




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