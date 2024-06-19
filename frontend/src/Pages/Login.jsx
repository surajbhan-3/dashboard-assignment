import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router'
import { AUTH_BASE_URL } from '../config/apiConfig';
import axios from 'axios';
import Loading from '../Component/Loading';
import { AuthContext } from '../Context/AuthContext';
import { useAuth } from '../Context/AuthContext';
const Login = () => {
  // Define the initial values for the form fields
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {setUser,setuId} = useAuth()
  const initialValues = {
    email: '',
    password: '',
  };



  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });



// Define the onSubmit function
const onSubmit = async (values, { setSubmitting }) => {
    console.log('hlsdfsd')
       setLoading(true)
         try {
          const response = await axios.post(`${AUTH_BASE_URL}/api/user/login`,values, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        console.log(response)
           if(response.data.result === true){
             localStorage.setItem('token', response.data.Token)
             localStorage.setItem('userId', response.data.userId)
             localStorage.setItem('user', JSON.stringify(response.data.user) )
             setuId(response.data.userId)
             setUser(response.data.user)
             const redirectId = JSON.stringify(response.data.user)
             const cleanRedirectId = redirectId.replace(/"/g, '');
            setLoading(false)
             navigate(`/${cleanRedirectId}/home`)
           }
          
         } catch (error) {
          setLoading(false)
          console.log(error, "error mesage")
         alert("An error occurred during login:");
         } finally{
          setSubmitting(false)
         }
  };

  const handleRegister = ()=>{
     alert("Redirecting to Register page")
    navigate("/register")
  }

  return (
     <React.Fragment>

      {
        loading? (<Loading />) :
        ( <div>
          <h1 className='login-form-heading'>Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form id='login-main'>
                <fieldset>
                  <div className='mb-1'>
                    <label htmlFor="email" className='form-label required'>Email</label>
                    <Field type="email" id="email" className='form-control' name="email" />
                    <ErrorMessage name="email" component="div" />
                  </div>
                </fieldset>
                <fieldset>
                  <div className='mb-2'>
                    <label htmlFor="password" className='form-label required'>Password</label>
                    <Field type="password" id="password" className='form-control' name="password" />
                    <ErrorMessage name="password" component="div" />
                  </div>
                </fieldset>
                <fieldset>
                  <div>
                    <button id='login-btn' className='form-control' type="submit" disabled={isSubmitting}>
                      Login
                    </button>
                  </div>
                </fieldset>
                <fieldset>
                  <div>
                    <button id='new-user-btn' onClick={handleRegister} className='form-control' type="button" disabled={isSubmitting}>
                       Register
                    </button>
                  </div>
                </fieldset>
              </Form>
            )}
          </Formik>
        </div>)
      }
     </React.Fragment>
  );
};

export default Login;
