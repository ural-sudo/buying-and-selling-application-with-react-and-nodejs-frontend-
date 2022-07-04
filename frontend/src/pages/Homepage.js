
import React from "react";
import ProductList from "../components/Products/ProductList";
import AuthContext from "../store/auth-context";
import { useContext } from "react";
const Homepage = () => {

    const authCtx = useContext(AuthContext);
    console.log(authCtx);
    return (
        <React.Fragment>
            <ProductList/>
        </React.Fragment>
    )
}
export default Homepage;