
import React,{useContext, useEffect} from "react";
import './ProductList.css';
import ProductItem from "./ProductItem";
import ProductContext from "../../store/product-context";
const ProductList = () => {

    const prodCtx = useContext(ProductContext);

    const fetchProduct = async  () => {
        const response =  await fetch('http://localhost:8080/product/getProds');
        const prodData = await response.json();
        
        prodCtx.fetchProd(prodData);
        
    }
    useEffect(() => {
        fetchProduct();
    }, [])
    console.log(prodCtx.productItem);

    return(
        <React.Fragment>
            <div className='container-list'>
                {prodCtx.productItem.map(data =>
                    <ProductItem 
                    key={data.id}
                    items={data}
                    /> 
                )}
            </div>
        </React.Fragment>
    )
}

export default ProductList;