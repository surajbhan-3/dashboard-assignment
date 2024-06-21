import React, { useState } from 'react'
import { useEffect } from 'react'
import apiService from '../config/apiServices'
import { useParams } from 'react-router-dom'
import SingleProduct from '../Component/SingleProduct'
import Navbar from '../Component/Navbar'


function Product() {
  const [data, setData] = useState([])
  const {user,product_id,title} = useParams()
  console.log(user, product_id, title, 'sdfsdf')
  useEffect(()=>{
    const getSingleProducts  = async()=>{
   try {
     const response = await apiService.get(`/${user}/single_product/${product_id}/${title}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
     if(response.data.result===true){
       setData(response.data.data[0])
     }
   } catch (error) {
     console.log(error)
   }
 
    }

    getSingleProducts()

 },[])



  return (
    <div>
      <Navbar />
      <SingleProduct product={data} />
      </div>
  )
}

export default Product