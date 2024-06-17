import React from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AUTH_BASE_URL } from '../config/apiConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate()
  // Define the initial values for the form fields
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username must be less than 20 characters')
      .required('Username is required'),
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
    const response = await axios.post(`${AUTH_BASE_URL}/api/user/register_user`,values)
    console.log(response, "resopndedd")
 
    if(response.data.result === true){
      alert("Redirection to Login page")
      navigate(`/`)
    }
  };

  return (
    <div>
      <h1 className='register-form-heading'>Register</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form id='register-main'>
            <fieldset>
                <div className='mb-1'>
                <label htmlFor="username" className='form-lable required' >Username</label>
                <Field type="text" id="username" className='form-control' name="username" />
                <ErrorMessage name="username" component="div" />
                </div>
            </fieldset> 
            <fieldset>
                <div className='mb-2'>
                <label htmlFor="email" className='form-lable required'>Email</label>
                <Field type="email" id="email" className='form-control' name="email" />
                <ErrorMessage name="email" component="div" />
                </div>
                </fieldset>
                <fieldset>
                <div className='mb-3'>
                <label htmlFor="password" className='form-lable required'>Password</label>
                <Field type="password" id="password" className='form-control' name="password" />
                <ErrorMessage name="password" component="div" />
                </div>
                </fieldset>
                <fieldset>
                <div>
                <button id='register-btn' className='form-control' type="submit" disabled={isSubmitting}>
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

export default Register;