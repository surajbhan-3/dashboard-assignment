// // development server
// const API_BASE_URL = 'http://localhost:4500';
// export const AUTH_BASE_URL ='http://localhost:4500';


// production server * vercel

// const API_BASE_URL = 'https://dashboard-assignment-ec41.vercel.app/';
// export const AUTH_BASE_URL = 'https://dashboard-assignment-ec41.vercel.app/';

// * render


// const API_BASE_URL = 'https://dashboard-assignment-t2ro.onrender.com';
// export const AUTH_BASE_URL = 'https://dashboard-assignment-t2ro.onrender.com';


//* aws
// const API_BASE_URL = 'http://13.235.15.76:4500';
// export const AUTH_BASE_URL = 'http://13.235.15.76:4500';

//* aws elastic beanstalk
// const API_BASE_URL = 'http://kryzen-app-env.eba-mhj6baup.ap-south-1.elasticbeanstalk.com';
// export const AUTH_BASE_URL = 'http://kryzen-app-env.eba-mhj6baup.ap-south-1.elasticbeanstalk.com';


//* aws elastic loadblancer
const API_BASE_URL = 'https://krylb-2021498952.ap-south-1.elb.amazonaws.com';
export const AUTH_BASE_URL = 'https://krylb-2021498952.ap-south-1.elb.amazonaws.com';


export const getToken = () => localStorage.getItem("token");


const apiConfig = {
  baseURL: `${API_BASE_URL}/api/product`,

  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`,
  },
  timeout: 5000, // Request timeout in milliseconds
};



export default apiConfig;