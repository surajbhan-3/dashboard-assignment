const {prisma } = require("../config/db.js")

const addProduct = async(req,res)=>{
    const {name, image,price,type,description}=req.body;
    const {userId} = req.params;
    const authenticatedUserId = req.body.userId

    try {

        if(authenticatedUserId !== parseInt(userId)){
            return res.status(404).send({"message":"user does not exist","result":false})
        }
        let convertType = type.toLowerCase()
        const validateType = ["electronics", "clothing", "books"]
        if(!validateType.includes(convertType)){
            return res.status(400).send({"message":"Invalid product type", "result":false})

        }
        
   
        const newProduct = await prisma.product.create({
            data:{
                name,
                image,
                price:parseInt(price),
                type:convertType,
                description,
                userId:parseInt(userId)
            }
        })

        res.status(201).send({data:newProduct, message:'data created succesffuly', result:true})

    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                "message":"Internal Server Error",
                "Error":error.message,
                "result":false
            })
            
    }

}

const editProduct = async(req,res)=>{
  
    const {name, image,price,type, description}=req.body;
    const {userId,id} = req.params;
    const authenticatedUserId = req.body.userId
    try {
        if(authenticatedUserId !== parseInt(userId)){
            return res.status(403).send({"message":"Forbidden:Action is not allowed","result":false})
        }

        const validateType = ["electronics", "clothing", "books"]
        if(!validateType.includes(type)){
            return res.status(400).send({"message":"Invalid product type", "result":false})
        }

        const product = await prisma.product.findUnique({where:{id:parseInt(id)}})
        if(!product){
            return res.status(404).send({"message":"Product is not available", "result":false})
        }

        const updateProduct = await prisma.product.update({where:{userId:parseInt(userId),id:parseInt(id)},
            data:{
                name:name || product.name,
                image:image|| product.image,
                price:parseInt(price) || product.price,
                type:type || product.type,
            }
        })

        res.status(201).send({message:'data created succesffuly', result:true})

    } catch (error) {
        res.status(500).send(
            {
                "message":"Internal Server Error",
                "Error":error.message,
                "result":false
            })
    }


    
}

const deleteProduct = async(req,res)=>{
console.log("heool")
    const {userId,id} = req.params;
    const authenticatedUserId = req.body.userId
    try {
        if(authenticatedUserId !== parseInt(userId)){
            return res.status(403).send({"message":"Forbidden:Action is not allowed","result":false})
        }
        const productDelete = await prisma.product.delete({
            where:{
                userId:parseInt(userId), 
                id:parseInt(id)
            }
        })
        return res.status(204).send({"message":"Product Deleted successfully", result:true})
    }
    catch{
        res.status(500).send(
            {
                "message":"Internal Server Error",
                "Error":error.message,
                "result":false
            })

    }



}


const filterProductByCategory = async(req,res)=>{

    const {userId,category} = req.params;
    const authenticatedUserId = req.body.userId
    try {
        if(authenticatedUserId !== parseInt(userId)){
            return res.status(403).send({"message":"Forbidden:Action is not allowed","result":false})
        }
        const filterProduct = await prisma.product.findMany({
            where:{
                userId:parseInt(userId),
                type:category
                
            }
        })

        return res.status(200).send({"data":filterProduct,"message":"Product Deleted successfully", result:true})
    }
    catch{
        res.status(500).send(
            {
                "message":"Internal Server Error",
                "Error":error.message,
                "result":false
            })

    }

    
}

const sortProduct = async(req,res)=>{

}

const getSingleProduct = async(req,res)=>{
    const {id, userId}=req.params
    const authenticatedUserId = req.body.userId
   try {
    if(authenticatedUserId !== parseInt(userId)){
        return res.status(403).send({"message":"Forbidden:Action is not allowed","result":false})
    }
    const singleProduct= await prisma.product.findUnique({where:{id:parseInt(id)}})
    res.status(201).send({data:[singleProduct], message:'Single product fetch succesffuly', result:true})

   } catch (error) {
  
    res.status(500).send(
        {
            "message":"Internal Server Errer",
            "Error":error.message,
            "result":false
        })
   }
    
}


const getAllProduct = async(req,res)=>{
    const {userId}=req.params
    const authenticatedUserId = req.body.userId
   
   try {
    if(authenticatedUserId !== parseInt(userId)){
        return res.status(403).send({"message":"Forbidden:Action is not allwed","result":false})
    }
    const allProduct= await prisma.product.findMany({where:{userId:parseInt(userId)}})
    res.status(201).send({data:allProduct, message:'all product fetch succesffuly', result:true})

   } catch (error) {
    console.log(error)
    res.status(500).send(
        {
            "message":"Internal Server Errer",
            "Error":error.message,
            "result":false
        })
   }
    
}






module.exports ={
    addProduct,
    editProduct,
    deleteProduct,
    filterProductByCategory,
    sortProduct,
    getSingleProduct,
    getAllProduct
}