

import React, { useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import './ProductDetail.css';
const ProductDetail = (props) => {

    const [title, setTitle] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [creator, setCreator] = useState('');
    const params = useParams();
    const fetchSingleProd = async () => {
        try{
            const response = await fetch(`http://localhost:8080/product/getProd/${params.prodId}`)
            const data = await response.json();
            
            setTitle(data.product.title);
            setImgUrl(data.product.imgUrl);
            setCreator(data.user.name);
        }catch(error){
            console.log(error);
        }      
    }

    useEffect(() => {
        fetchSingleProd(); 
    }, []);

    return(
        <div className="detail-container">
            <div className="photo-container">
                <img src={`http://localhost:8080/${imgUrl}`}/>
            </div>
            <div className="info-container">
                <div className="info-item info-container__title">
                    {title}
                </div>
                <div className="info-item info-container__creator-items">
                    <div className="info-item info-container__creator-name">
                        Seller: {creator}
                    </div>
                    <div className="info-item info-container__creator-point">
                        Seller Point:
                    </div>
                </div>    
                <div className="info-item info-container__price">
                    
                </div>
                <div className="info-container__description">

                </div>
            </div>
        </div>
    );
}
export default ProductDetail;