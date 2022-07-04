import React,{} from "react";
import './MyProductsItem.css';

const MyProductsItem = (props) => {
    
    
    return(
        <React.Fragment>
            
            <li className="product-items">
                <div className="product-items__item">
                    <div className="product-item__image">
                        <img src={`http://localhost:8080/${props.imgUrl}`} alt='preview'/>
                    </div>
                </div>    
                <div className="product-items__item">
                   <div className="title-item">
                       Title:  {props.title}
                   </div>
                </div>
                <div className="product-items__item">
                    <div className="price-item">
                        {props.price} TL
                    </div>
                </div>
                
                <div className="product-items__item">
                    <div className="action">
                        <button>Edit</button>
                    </div>
                    <div className="action">
                        <button>Delete</button>
                    </div>
                </div>
            </li>
        </React.Fragment>
    );
}

export default MyProductsItem