
import React from "react";
import { Link } from "react-router-dom";
import './ProductItem.css'
const ProductItem = (props) => {
    const imgUrl = props.items.imgUrl;
    const id = props.items.id;
    
    return(
        <React.Fragment>
            <div className="container-item">
                <Link to={`/product/${id}`}>
                    <img src={`http://localhost:8080/${imgUrl}`} alt='preview'/>
                </Link>
            </div>
            
        </React.Fragment>
    )
}

export default ProductItem;