
import React,{useState} from "react"
const ProductContext = React.createContext({

    productItem: [],
    fetchProd (prods) {}

});
export const ProductContextProvider = (props) => {

    const [prodItem, setProdItem] = useState([]);
    

    const fetchProdHandler = (prodItem) => {
        setProdItem(prodItem)
    }

    const prodContext = {
        productItem:prodItem,
        fetchProd:fetchProdHandler
    }


    return (
        <ProductContext.Provider value={prodContext}>
            {props.children}
        </ProductContext.Provider>
    );
}


export default ProductContext;