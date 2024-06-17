import React from 'react';
import { useNavigate, useHistory } from 'react-router-dom';


const Card = ({ imageUrl, title,description, price,product_id,disableButtons}) => {
const navigate = useNavigate()
const userId = localStorage.getItem('userId')
const handleEdit = async()=>{
  navigate(`/${userId}/edit_product/${product_id}`)
}

const handleDelete = async()=>{
  navigate(`/${userId}/edit_product/${product_id}`)
}
  return (
    <div className="card">
      {/* Photo */}
      <div
        className="img-responsive img-responsive-21x9 card-img-top"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="text-secondary">{description}</p>
        <p className="text-secondary"><b>Price :</b> ₹{price}</p>
        <button disabled={disableButtons} onClick={handleEdit}>Edit</button> <span><button disabled={disableButtons} onClick={handleDelete}>Delete</button></span>
      </div>
    </div>
  );
};

export default Card;
