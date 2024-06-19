import React from 'react';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';


const Card = ({ imageUrl, title,description, price,product_id,disableButtons, productDelete}) => {
const navigate = useNavigate()
const {user} = useParams()
const handleEdit = async()=>{
  navigate(`/${user}/edit_product/${product_id}/${title}`)
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
        <p className="text-secondary">{description.substring(0,80)}</p>
        <p className="text-secondary"><b>Price :</b> ₹{price}</p>
        <button disabled={disableButtons} onClick={handleEdit}>Edit</button> 
        <span><button disabled={disableButtons} onClick={()=>{productDelete(product_id,title)}}>Delete</button></span>
      </div>
    </div>
  );
};

export default Card;
