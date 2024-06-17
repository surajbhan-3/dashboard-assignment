// // development server
// const API_BASE_URL = 'http://localhost:4500';
// export const AUTH_BASE_URL ='http://localhost:4500';

// production server * vercel

// const API_BASE_URL = 'https://dashboard-assignment-ec41-flj65ag33-surajbhan3s-projects.vercel.app';
// export const AUTH_BASE_URL = 'https://dashboard-assignment-ec41-flj65ag33-surajbhan3s-projects.vercel.app';

// * render


const API_BASE_URL = 'https://dashboard-assignment-t2ro.onrender.com';
export const AUTH_BASE_URL = 'https://dashboard-assignment-t2ro.onrender.com';




export  const Token = localStorage.getItem("token");


const apiConfig = {
  baseURL: `${API_BASE_URL}/api/product`,

  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Token}`,
  },
  // timeout: 5000, // Request timeout in milliseconds
};



export default apiConfig;