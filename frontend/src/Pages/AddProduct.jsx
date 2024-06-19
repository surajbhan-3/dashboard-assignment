
import React, { useState } from 'react'
import apiService from '../config/apiServices'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Component/Loading';
import Navbar from '../Component/Navbar';
function Addproduct() {
const [loading, setLoading] = useState(false)
const userId = localStorage.getItem('userId')
const {user} = useParams()
console.log(user, "userlaskjf ")


const onSubmit = async (values, { setSubmitting }) => {
        setLoading(true)
        console.log(loading, 'loading')
      const response = await apiService.post(`/${user}/add_product`,values)
      console.log(response, "resopndedd")
       if(response.data.flag === true){
        alert("Product added to queue")
        setLoading(false)
       }else if(response.data.result === true){
        alert("Product added successfully")
        setLoading(false)
       }
      console.log(values.settime, typeof(values.settime))
     
  };


const initialValues = {
    name:'',
    image: '',
    price: '',
    description:'',
    type:'',
    settime:''

  };

  const productSchema = Yup.object({
    name: Yup.string().required('product name  is required'),
    image: Yup.string().url('image must be a url').nullable().required('product image url is required'),
    description: Yup.string().trim('not trailing space needed').strict(true).min(75, "minimum 75 characters are required").max(200, "max 100 characters only")
    .required('product description required'),
    price:Yup.number('it must be a number').required('price is required'),
    settime:Yup.number('it must be a number'),
    type:Yup.string().required('catgory is required').oneOf(['electronics', 'clothing', 'books'])

  });


  return (
  <React.Fragment>
   {loading? (<Loading />) : 
   (<React.Fragment>
    <Navbar />
     <div className='add-product-form'>
    <h1 className='add-product-form-heading'>Add Product</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={productSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form id='login-main' >
          <fieldset>
            <div className='mb-1'>
              <label htmlFor="product_name" className='form-label required'>Product Name</label>
              <Field type="text" id="product_name" className='form-control' name="name" />
              <ErrorMessage name="product_name" component="div" />
            </div>
          </fieldset>
          <fieldset>
            <div className='mb-2'>
              <label htmlFor="product_image" className='form-label required'>Product Image</label>
              <Field type="text" id="product_image" className='form-control' name="image" />
              <ErrorMessage name="image" component="div" />
            </div>
          </fieldset>

          <fieldset>
          <div className='mb-3'>
              <label htmlFor="description" className='form-label required'>Description</label>
              <Field as='textarea' type="text" id="description" data-bs-toggle="autosize" className='form-control' name="description" />
              <ErrorMessage name="description" component="div" />
            </div>
          </fieldset>
          <fieldset>
          <div className='mb-4'>
              <label htmlFor="price" className='form-label required'>Price</label>
              <Field type="number" id="price" className='form-control' name="price" />
              <ErrorMessage name="price" component="div" />
            </div>
           </fieldset>

           <fieldset>
            
            <div className='mb-5'>
                <label htmlFor="category" className='form-label required'>Type</label>
                <Field as='select' id="category" className='form-control' name="type" >
                  <option value="">select</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  </Field>
                <ErrorMessage name="type" component="div" />
              </div>
            </fieldset>

            <fieldset>
          <div className='mb-6' id='mbb-6'>
              <label htmlFor="settime" className='form-label required'>Set Delay Time (minutes)</label>
              <Field type="number" id="settime" className='form-control' name="settime"  />
              <ErrorMessage name="settime" component="div" />
            </div>
           </fieldset>

           <fieldset>
            <div className='mb-7'>
              <button id='login-btn' className='form-control' type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </fieldset>
        </Form>
      )}
    </Formik>
  </div></React.Fragment>)  
  }
  </React.Fragment>
  )
}

export default Addproduct