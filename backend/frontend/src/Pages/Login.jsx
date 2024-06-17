import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate} from 'react-router'
import { AUTH_BASE_URL } from '../config/apiConfig';
import axios from 'axios';
const Login = () => {
  // Define the initial values for the form fields
  const navigate = useNavigate()
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
    setTimeout(() => {
      console.log('Form data', values);
      setSubmitting(false);
    }, 500);
   const response = await axios.post(`${AUTH_BASE_URL}/api/user/login`,values)
   console.log(response, "resopndedd")

   if(response.data.result === true){
     localStorage.setItem('token', response.data.Token)
     localStorage.setItem('userId', response.data.userId)
    
     navigate(`/${response.data.userId}/home`)
   }

  };

  const handleRegister = ()=>{
     alert("Redirecting to Register page")
    navigate("/register")
  }

  return (
    <div>
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
    </div>
  );
};

export default Login;
